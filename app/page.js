'use client';
import Head from 'next/head'
import { motion } from 'framer-motion'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {

  const router = useRouter();
  const { user } = useAuth();
  // Animated bubbles data for the 3D effect
  const bubbles = [
    { id: 1, size: 'w-16 h-16', color: 'bg-purple-500', position: 'top-20 left-10' },
    { id: 2, size: 'w-24 h-24', color: 'bg-blue-500', position: 'bottom-1/4 right-20' },
    { id: 3, size: 'w-12 h-12', color: 'bg-pink-500', position: 'top-1/3 right-1/4' },
    { id: 4, size: 'w-20 h-20', color: 'bg-green-500', position: 'bottom-20 left-1/3' },
  ]

  const handleProtectedRedirect = (target) => {
  if (user) {
    router.push(target); // ✅ user logged in
  } else {
    router.push(`/login?redirect=${target}`); // ✅ send to login first
  }
};

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      <Head>
        <title>HireHatch - Freelance Marketplace</title>
        <meta name="description" content="Find top freelance talent for your projects" />
      </Head>

      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              delay: Math.random() * 5
            }}
            className={`absolute rounded-full filter blur-xl opacity-30 ${bubble.size} ${bubble.color} ${bubble.position}`}
          />
        ))}
      </div>

      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-md z-10 relative">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
              HireHatch
            </h1>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex space-x-6"
          >
            <Link href="/login" className="hover:text-indigo-400 transition-colors py-2 duration-300">Sign In</Link>
            <Link href="/signup" className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 transition-all duration-300">Sign Up</Link>
            <Link href="/creategig" className="hover:text-indigo-400 transition-colors duration-300 flex items-center">
              <span>Become a Seller</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10">
        <section className="container mx-auto px-6 py-32 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">
                Build Dreams,
              </span>
              <br />
              Not Just Teams
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Hire top freelance talent across the globe or showcase your skills to potential clients.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
              onClick={() => handleProtectedRedirect("/categories")}
               className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Find Talent
              </button>
              <button
               onClick={() => handleProtectedRedirect("/creategig")}
               className="px-8 py-3 rounded-full border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                Start Selling
              </button>
            </div>
          </motion.div>

          {/* 3D Card Mockup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            className="mt-20 w-full max-w-3xl bg-gray-800/50 backdrop-blur-md rounded-3xl overflow-hidden border border-gray-700/50 shadow-2xl"
          >
            <div className="h-8 bg-gray-700/50 flex items-center px-4">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((item) => (
                  <motion.div
                    key={item}
                    whileHover={{ y: -10 }}
                    className="bg-gray-800/70 hover:bg-gray-700/70 rounded-xl p-6 transition-all duration-300 border border-gray-700/50"
                  >
                    <div className="w-16 h-16 bg-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                      </svg>
                    </div>
                    <h3 className="text-lg font-semibold mb-2">Service {item}</h3>
                    <p className="text-gray-400 text-sm">Expert freelancer available for your project</p>
                    <button className="mt-4 text-sm px-4 py-2 bg-indigo-600/30 hover:bg-indigo-600/50 rounded-full transition-all duration-300">
                      View Profile
                    </button>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 border-t border-gray-800/50">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6"
          >
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose HireHatch?</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Our platform connects businesses with vetted professionals across all industries.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-8 transition-all duration-300 border border-gray-700/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Global Talent</h3>
                <p className="text-gray-400">
                  Access freelancers from around the world with diverse skill sets and competitive rates.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-8 transition-all duration-300 border border-gray-700/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Verified Professionals</h3>
                <p className="text-gray-400">
                  All freelancers undergo a rigorous vetting process to ensure quality and reliability.
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                className="bg-gray-800/50 hover:bg-gray-700/50 rounded-xl p-8 transition-all duration-300 border border-gray-700/30"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-lg flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Payments</h3>
                <p className="text-gray-400">
                  Our escrow system ensures payments are only released when work is completed to your satisfaction.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-gradient-to-br from-gray-900 to-indigo-900/30">
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Ready to <span className="bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent">Get Started</span>?
              </h2>
              <p className="text-xl text-gray-300 mb-12">
                Join thousands of businesses and freelancers already using HireHatch.
              </p>
              <div className="flex flex-wrap justify-center gap-6">
                <button className="px-8 py-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl shadow-lg shadow-indigo-500/20">
                  Create Free Account
                </button>
                <button className="px-8 py-4 rounded-full border-2 border-indigo-500 text-indigo-400 hover:bg-indigo-500/10 font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                  Learn More
                </button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900/70 border-t border-gray-800/50 relative z-10">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                HireHatch
              </h2>
              <p className="text-gray-400 mt-2">The freelance marketplace of the future</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C9.021 2.013 9.375 2 11.985 2h.33zm-.081 1.802h-.078c-2.29 0-2.686.011-3.711.056-.875.041-1.349.2-1.665.415a3.093 3.093 0 00-1.025 1.025c-.214.316-.374.79-.415 1.665-.045 1.027-.056 1.421-.056 3.711v.078c0 2.29.011 2.685.056 3.711.041.875.2 1.349.415 1.665.26.4.625.765 1.025 1.025.316.214.79.374 1.665.415 1.027.045 1.421.056 3.711.056h.078c2.29 0 2.685-.011 3.711-.056.875-.041 1.349-.2 1.665-.415a3.097 3.097 0 001.025-1.025c.214-.316.374-.79.415-1.665.045-1.027.056-1.421.056-3.711v-.078c0-2.29-.011-2.685-.056-3.711-.041-.875-.2-1.349-.415-1.665a3.097 3.097 0 00-1.025-1.025c-.316-.214-.79-.374-1.665-.415-1.027-.045-1.421-.056-3.711-.056zm4.873 3.583c1.125 0 2.037.912 2.037 2.037s-.912 2.037-2.037 2.037a2.036 2.036 0 01-2.037-2.037c0-1.125.912-2.037 2.037-2.037zm-10.584 1.3a4.915 4.915 0 004.914 4.914h.032a4.915 4.915 0 004.914-4.914V12a4.915 4.915 0 00-4.914-4.914H12a4.915 4.915 0 00-4.914 4.914v.032zm8.284-3.836a1.171 1.171 0 110-2.343 1.171 1.171 0 010 2.343z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} HireHatch. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Cookie Policy</a>
              <a href="#" className="text-gray-400 hover:text-indigo-400 text-sm transition-colors">Contact Us</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
