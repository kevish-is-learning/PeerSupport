"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { contentApi } from "../../lib/api";

/**
 * Homepage social proof. Renders nothing until an admin publishes testimonials,
 * so an empty platform doesn't show an empty section.
 */
export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    contentApi
      .listTestimonials()
      .then((res) => setTestimonials(res.data?.testimonials || []))
      .catch(() => setTestimonials([]));
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-gray-100 bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            What aspirants say
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Real feedback from mentees who booked sessions on PeerSupport.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item) => (
            <figure
              key={item.id}
              className="flex h-full flex-col rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-gray-300 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
            >
              <div className="mb-3 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < item.rating
                        ? "h-3.5 w-3.5 fill-[#F59E0B] text-[#F59E0B]"
                        : "h-3.5 w-3.5 text-gray-200"
                    }
                  />
                ))}
              </div>

              <blockquote className="flex-1 text-sm leading-relaxed text-gray-700">
                “{item.quote}”
              </blockquote>

              <figcaption className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
                {item.authorImageUrl ? (
                  <img
                    src={item.authorImageUrl}
                    alt=""
                    className="h-9 w-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#EEF0FE] text-sm font-bold text-[#5061E4]">
                    {item.authorName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-gray-900">{item.authorName}</p>
                  {item.authorRole && (
                    <p className="truncate text-xs text-gray-500">{item.authorRole}</p>
                  )}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
