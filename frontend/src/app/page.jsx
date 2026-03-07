"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, BookOpen, Users, Award, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuthStore } from "../stores/authStore";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, user, fetchUser } = useAuthStore();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (isAuthenticated && user) {
      router.push("/dashboard");
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">PeerSupport</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Connect with{" "}
            <span className="text-primary">Expert Mentors</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
            Get personalized guidance from IIM alumni and top MBA professionals.
            Ace your CAT exam, crack interviews, and build your dream career.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/register">
              <Button size="lg" className="gap-2">
                Start Your Journey <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/register?role=mentor">
              <Button size="lg" variant="outline">
                Become a Mentor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Why Choose PeerSupport?
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to succeed in your MBA journey
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Users,
                title: "Expert Mentors",
                description: "Connect with IIM alumni and industry professionals",
              },
              {
                icon: BookOpen,
                title: "1-on-1 Sessions",
                description: "Personalized guidance tailored to your needs",
              },
              {
                icon: Award,
                title: "Verified Profiles",
                description: "All mentors are verified for quality assurance",
              },
              {
                icon: Star,
                title: "Top Ratings",
                description: "Learn from highly-rated mentors with proven track records",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-2xl border bg-white p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white">
            Ready to Start Your Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
            Join thousands of students who have transformed their careers with PeerSupport
          </p>
          <Link href="/register">
            <Button
              size="lg"
              variant="secondary"
              className="mt-8 gap-2"
            >
              Get Started Free <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="font-bold">PeerSupport</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2026 PeerSupport. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
