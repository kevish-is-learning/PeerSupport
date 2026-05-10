/**
 * Unit Tests for Slot Generation
 *
 * Tests:
 * 1. Exact window fit — slots fill the entire window perfectly
 * 2. Slot straddling window end is excluded
 * 3. Cross-service conflict blocks slot
 * 4. Buffer time shifts slots correctly
 * 5. Minimum lead time filters imminent slots
 * 6. No bookings → all possible slots returned
 * 7. Multiple bookings → only non-conflicting slots returned
 * 8. Empty window (start === end) → no slots
 *
 * Run: node --test src/__tests__/slotGenerator.test.js
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { generateSlots, intervalsOverlap } from '../utils/slotGenerator.js';

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Create a UTC date for a specific hour:minute on 2026-05-15 */
function utc(h, m = 0) {
  return new Date(Date.UTC(2026, 4, 15, h, m, 0, 0)); // May = month 4 (0-indexed)
}

/** A far-past "now" so no slots are filtered by minLeadMinutes */
const PAST_NOW = new Date('2020-01-01T00:00:00Z');

// ─── intervalsOverlap ────────────────────────────────────────────────────────

describe('intervalsOverlap', () => {
  it('should detect overlapping intervals', () => {
    assert.equal(intervalsOverlap(utc(9), utc(10), utc(9, 30), utc(10, 30)), true);
  });

  it('should return false for adjacent (non-overlapping) intervals', () => {
    // [9:00–10:00) and [10:00–11:00) — end-touching is NOT overlap
    assert.equal(intervalsOverlap(utc(9), utc(10), utc(10), utc(11)), false);
  });

  it('should detect containment', () => {
    assert.equal(intervalsOverlap(utc(9), utc(12), utc(10), utc(11)), true);
  });

  it('should return false for completely separate intervals', () => {
    assert.equal(intervalsOverlap(utc(9), utc(10), utc(14), utc(15)), false);
  });
});

// ─── generateSlots ───────────────────────────────────────────────────────────

describe('generateSlots', () => {
  it('1. Exact window fit — slots fill the entire window', () => {
    // Window: 9:00–11:00, Duration: 30 min → 4 slots
    const window = { startTime: utc(9), endTime: utc(11) };
    const slots = generateSlots(window, 30, [], { now: PAST_NOW });

    assert.equal(slots.length, 4);
    assert.deepEqual(slots[0], { startTime: utc(9, 0), endTime: utc(9, 30) });
    assert.deepEqual(slots[1], { startTime: utc(9, 30), endTime: utc(10, 0) });
    assert.deepEqual(slots[2], { startTime: utc(10, 0), endTime: utc(10, 30) });
    assert.deepEqual(slots[3], { startTime: utc(10, 30), endTime: utc(11, 0) });
  });

  it('2. Slot straddling window end is excluded', () => {
    // Window: 9:00–10:45, Duration: 30 min → 3 slots (9:00, 9:30, 10:00)
    // 10:30+30=11:00 > 10:45 → excluded
    const window = { startTime: utc(9), endTime: utc(10, 45) };
    const slots = generateSlots(window, 30, [], { now: PAST_NOW });

    assert.equal(slots.length, 3);
    assert.deepEqual(slots[0], { startTime: utc(9, 0), endTime: utc(9, 30) });
    assert.deepEqual(slots[1], { startTime: utc(9, 30), endTime: utc(10, 0) });
    assert.deepEqual(slots[2], { startTime: utc(10, 0), endTime: utc(10, 30) });
  });

  it('3. Cross-service conflict blocks slot', () => {
    // Window: 9:00–11:00, Duration: 30 min
    // Existing booking (different service): 9:30–10:00
    // → slot 9:30–10:00 blocked, others available
    const window = { startTime: utc(9), endTime: utc(11) };
    const bookings = [{ startTime: utc(9, 30), endTime: utc(10, 0) }];
    const slots = generateSlots(window, 30, bookings, { now: PAST_NOW });

    assert.equal(slots.length, 3);
    // Slot at 9:30 should be missing
    const slotTimes = slots.map((s) => s.startTime.getTime());
    assert.ok(!slotTimes.includes(utc(9, 30).getTime()), 'Conflicting 9:30 slot should be excluded');
    assert.ok(slotTimes.includes(utc(9, 0).getTime()), '9:00 slot should be present');
    assert.ok(slotTimes.includes(utc(10, 0).getTime()), '10:00 slot should be present');
    assert.ok(slotTimes.includes(utc(10, 30).getTime()), '10:30 slot should be present');
  });

  it('4. Buffer time shifts slots correctly', () => {
    // Window: 9:00–11:00, Duration: 30 min, Buffer: 15 min
    // Step size = 30 + 15 = 45 min
    // Slots: 9:00–9:30, 9:45–10:15, 10:30–11:00 → 3 slots
    const window = { startTime: utc(9), endTime: utc(11) };
    const slots = generateSlots(window, 30, [], { bufferMinutes: 15, now: PAST_NOW });

    assert.equal(slots.length, 3);
    assert.deepEqual(slots[0], { startTime: utc(9, 0), endTime: utc(9, 30) });
    assert.deepEqual(slots[1], { startTime: utc(9, 45), endTime: utc(10, 15) });
    assert.deepEqual(slots[2], { startTime: utc(10, 30), endTime: utc(11, 0) });
  });

  it('5. Minimum lead time filters imminent slots', () => {
    // Window: 9:00–11:00, Duration: 30 min
    // "Now" = 9:20 → cutoff = 9:35
    // Slots starting before 9:35 should be excluded: 9:00 and 9:30
    const window = { startTime: utc(9), endTime: utc(11) };
    const fakeNow = utc(9, 20);
    const slots = generateSlots(window, 30, [], { now: fakeNow, minLeadMinutes: 15 });

    assert.equal(slots.length, 2);
    assert.deepEqual(slots[0], { startTime: utc(10, 0), endTime: utc(10, 30) });
    assert.deepEqual(slots[1], { startTime: utc(10, 30), endTime: utc(11, 0) });
  });

  it('6. No bookings → all possible slots returned', () => {
    // Window: 14:00–16:00, Duration: 60 min → 2 slots
    const window = { startTime: utc(14), endTime: utc(16) };
    const slots = generateSlots(window, 60, [], { now: PAST_NOW });

    assert.equal(slots.length, 2);
    assert.deepEqual(slots[0], { startTime: utc(14, 0), endTime: utc(15, 0) });
    assert.deepEqual(slots[1], { startTime: utc(15, 0), endTime: utc(16, 0) });
  });

  it('7. Multiple bookings → only non-conflicting slots returned', () => {
    // Window: 9:00–12:00, Duration: 30 min → normally 6 slots
    // Bookings: 9:00–9:30 and 10:30–11:00
    const window = { startTime: utc(9), endTime: utc(12) };
    const bookings = [
      { startTime: utc(9, 0), endTime: utc(9, 30) },
      { startTime: utc(10, 30), endTime: utc(11, 0) },
    ];
    const slots = generateSlots(window, 30, bookings, { now: PAST_NOW });

    assert.equal(slots.length, 4);
    const starts = slots.map((s) => s.startTime.getTime());
    assert.ok(!starts.includes(utc(9, 0).getTime()), '9:00 should be blocked');
    assert.ok(!starts.includes(utc(10, 30).getTime()), '10:30 should be blocked');
  });

  it('8. Empty window (zero duration) → no slots', () => {
    const window = { startTime: utc(9), endTime: utc(9) };
    const slots = generateSlots(window, 30, [], { now: PAST_NOW });
    assert.equal(slots.length, 0);
  });

  it('9. Window shorter than duration → no slots', () => {
    // Window: 9:00–9:20, Duration: 30 min → 0 slots
    const window = { startTime: utc(9), endTime: utc(9, 20) };
    const slots = generateSlots(window, 30, [], { now: PAST_NOW });
    assert.equal(slots.length, 0);
  });

  it('10. Booking partially overlapping a slot blocks it', () => {
    // Window: 9:00–11:00, Duration: 30 min
    // Booking: 9:15–9:45 (overlaps both 9:00–9:30 and 9:30–10:00)
    const window = { startTime: utc(9), endTime: utc(11) };
    const bookings = [{ startTime: utc(9, 15), endTime: utc(9, 45) }];
    const slots = generateSlots(window, 30, bookings, { now: PAST_NOW });

    assert.equal(slots.length, 2);
    const starts = slots.map((s) => s.startTime.getTime());
    assert.ok(!starts.includes(utc(9, 0).getTime()), '9:00 slot overlaps booking');
    assert.ok(!starts.includes(utc(9, 30).getTime()), '9:30 slot overlaps booking');
    assert.ok(starts.includes(utc(10, 0).getTime()), '10:00 slot should be available');
    assert.ok(starts.includes(utc(10, 30).getTime()), '10:30 slot should be available');
  });

  it('11. Buffer time + conflict → correct exclusion', () => {
    // Window: 9:00–12:00, Duration: 30 min, Buffer: 15 min
    // Step = 45. Slots: 9:00, 9:45, 10:30, 11:15
    // Booking: 9:45–10:15 → blocks 9:45 slot
    const window = { startTime: utc(9), endTime: utc(12) };
    const bookings = [{ startTime: utc(9, 45), endTime: utc(10, 15) }];
    const slots = generateSlots(window, 30, bookings, { bufferMinutes: 15, now: PAST_NOW });

    assert.equal(slots.length, 3);
    const starts = slots.map((s) => s.startTime.getTime());
    assert.ok(!starts.includes(utc(9, 45).getTime()), '9:45 should be blocked');
    assert.ok(starts.includes(utc(9, 0).getTime()));
    assert.ok(starts.includes(utc(10, 30).getTime()));
    assert.ok(starts.includes(utc(11, 15).getTime()));
  });
});
