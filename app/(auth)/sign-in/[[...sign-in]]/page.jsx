import { SignIn } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Page() {
  // Check if user is already signed in
  const { userId } = await auth();

  // If user is already signed in, redirect to dashboard
  if (userId) {
    redirect("/dashboard");
  }

  return (
    <section className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
        {/* Left Side - Hero Section */}
        <section className="relative flex h-32 items-end bg-blue-600 lg:col-span-5 lg:h-full xl:col-span-6">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              alt="AI Interview Platform"
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80"
              className="h-full w-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-blue-600/80"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 hidden lg:block lg:p-12">
            <a
              className="block text-white hover:text-blue-200 transition-colors"
              href="/"
            >
              <span className="sr-only">AI Interview Platform</span>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <svg
                    className="w-7 h-7 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span className="text-2xl font-bold">AI MOCK INTERVIEW</span>
              </div>
            </a>

            <div className="mt-16 space-y-8">
              <h2 className="text-4xl font-bold text-white leading-tight">
                Master Your Interview Skills
              </h2>

              <p className="text-lg text-blue-100 max-w-md">
                Practice with intelligent AI interviewers and get real-time
                feedback to boost your confidence.
              </p>

              {/* Feature Highlights */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">Real-time AI feedback</span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">
                    Industry-specific questions
                  </span>
                </div>

                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <span className="text-blue-100">Performance analytics</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Right Side - Sign In Form */}
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="w-full max-w-md">
            {/* Mobile Header */}
            <div className="relative -mt-16 block lg:hidden text-center">
              <a
                className="inline-flex size-16 items-center justify-center rounded-full bg-white shadow-lg text-blue-600 sm:size-20 dark:bg-gray-900 hover:shadow-xl transition-shadow"
                href="/"
              >
                <span className="sr-only">AI Interview Platform</span>
                <svg
                  className="h-8 sm:h-10"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <h1 className="mt-4 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl dark:text-white">
                Welcome to AI MOCK INTERVIEW
              </h1>

              <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-sm mx-auto">
                Sign in to start practicing with our AI interviewers and improve
                your skills.
              </p>
            </div>

            {/* Sign In Form */}
            <div className="mt-8 lg:mt-0">
              <div className="">
                <div className="space-y-6">
                  <SignIn />
                </div>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  New to AI MOCK INTERVIEW?{" "}
                  <a
                    href="/sign-up"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Create an account
                  </a>
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    </section>
  );
}
