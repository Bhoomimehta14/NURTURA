'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Mail, Phone, Lock, Eye, EyeOff, ChevronRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [seniorMode, setSeniorMode] = useState(false);

  // Staged animation states
  const [stage, setStage] = useState(0);
  // 0: nothing, 1: trunk, 2: branches, 3: leaves-1, 4: leaves-2, 5: leaves-3, 6: butterflies, 7: idle

  useEffect(() => {
    // Staged reveal animation
    const timings = [300, 800, 1400, 2000, 2500, 3000, 3500, 4000];
    timings.forEach((time, index) => {
      setTimeout(() => setStage(index + 1), time);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (seniorMode) {
        router.push('/senior');
      } else {
        router.push('/dashboard');
      }
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#F5F0E8] flex overflow-hidden">
      {/* Left Side - Living Tree */}
      <div className="hidden lg:flex flex-1 flex-col items-center justify-center relative">
        {/* Soft ambient light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-b from-[#FFF9E6]/40 to-transparent rounded-full blur-3xl" />

        {/* Tree Container */}
        <div className="relative z-10 w-full max-w-xl px-8">
          <OrganicTree stage={stage} />

          {/* Butterflies - only appear at stage 6+ */}
          {stage >= 6 && (
            <>
              <GentleButterfly
                className="absolute top-[15%] left-[18%]"
                delay={0}
                color="#E8B4B8"
              />
              <GentleButterfly
                className="absolute top-[25%] right-[15%]"
                delay={1.5}
                color="#B8D4E8"
              />
              <GentleButterfly
                className="absolute top-[45%] left-[12%]"
                delay={3}
                color="#D4C4A8"
              />
            </>
          )}
        </div>

        {/* Brand Text - fades in with branches */}
        <div
          className="relative z-10 text-center mt-6 transition-all duration-1000 ease-out"
          style={{
            opacity: stage >= 5 ? 1 : 0,
            transform: stage >= 5 ? 'translateY(0)' : 'translateY(10px)',
          }}
        >
          <h1
            className="text-5xl text-[#4A5D4A] tracking-wider"
            style={{
              fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
              fontStyle: 'italic',
              fontWeight: 500,
              letterSpacing: '0.15em',
            }}
          >
            Nurtura
          </h1>
          <p className="text-[#7A8A7A] mt-3 text-lg italic font-light">
            "Caring for you, every step of the way."
          </p>
        </div>
      </div>

      {/* Right Side - Login Panel */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-[#7A9A7A] to-[#5A7A6A] flex items-center justify-center shadow-lg">
              <span className="text-3xl">🌳</span>
            </div>
            <h1
              className="text-3xl text-[#4A5D4A] tracking-wider"
              style={{
                fontFamily: "'Playfair Display', 'Times New Roman', Georgia, serif",
                fontStyle: 'italic',
                fontWeight: 500,
              }}
            >
              Nurtura
            </h1>
            <p className="text-[#7A8A7A] mt-1 text-sm italic">"Caring for you, every step of the way."</p>
          </div>

          {/* Login Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-white/60">
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-[#3A4A3A] mb-2">
                Welcome Back
              </h2>
              <p className="text-[#6A7A6A]">
                We're glad to see you again. Sign in to continue.
              </p>
            </div>

            {/* Login Method Toggle */}
            <div className="flex bg-[#F5F5F3] rounded-xl p-1 mb-6">
              <button
                type="button"
                onClick={() => setLoginMethod('email')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'email'
                    ? 'bg-white text-[#3A4A3A] shadow-sm'
                    : 'text-[#6A7A6A] hover:text-[#3A4A3A]'
                }`}
              >
                <Mail className="w-4 h-4" />
                Email
              </button>
              <button
                type="button"
                onClick={() => setLoginMethod('phone')}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                  loginMethod === 'phone'
                    ? 'bg-white text-[#3A4A3A] shadow-sm'
                    : 'text-[#6A7A6A] hover:text-[#3A4A3A]'
                }`}
              >
                <Phone className="w-4 h-4" />
                Phone
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {loginMethod === 'email' ? (
                <div>
                  <label className="block text-sm font-medium text-[#4A5A4A] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3.5 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] focus:border-[#7A9A7A] focus:ring-2 focus:ring-[#7A9A7A]/20 text-[#3A4A3A] placeholder:text-[#9A9A9A] outline-none transition-all"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#4A5A4A] mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-3.5 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] focus:border-[#7A9A7A] focus:ring-2 focus:ring-[#7A9A7A]/20 text-[#3A4A3A] placeholder:text-[#9A9A9A] outline-none transition-all"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-[#4A5A4A] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full px-4 py-3.5 bg-[#FAFAFA] rounded-xl border border-[#E5E5E5] focus:border-[#7A9A7A] focus:ring-2 focus:ring-[#7A9A7A]/20 text-[#3A4A3A] placeholder:text-[#9A9A9A] outline-none transition-all pr-12"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A9A9A] hover:text-[#5A6A5A] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Senior Citizen Option */}
              <div className="bg-[#FBF9F6] rounded-xl p-4 border border-[#EDE9E3]">
                <label className="flex items-start gap-3 cursor-pointer">
                  <div className="relative mt-0.5">
                    <input
                      type="checkbox"
                      checked={seniorMode}
                      onChange={(e) => setSeniorMode(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-5 h-5 rounded border-2 border-[#C5C0B8] bg-white peer-checked:bg-[#7A9A7A] peer-checked:border-[#7A9A7A] transition-all flex items-center justify-center">
                      {seniorMode && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <span className="text-[#4A5A4A] font-medium">I am a Senior Citizen</span>
                    <p className="text-[#8A8A8A] text-sm mt-0.5">Simpler interface with voice assistance</p>
                  </div>
                </label>
              </div>

              <div className="flex justify-end">
                <a href="/forgot-password" className="text-sm text-[#7A9A7A] hover:text-[#5A7A6A] transition-colors">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#6A8A6A] hover:bg-[#5A7A5A] text-white font-medium rounded-xl transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[#7A8A7A]">
                New here?{' '}
                <a href="/signup" className="font-medium text-[#6A8A6A] hover:text-[#5A7A5A] transition-colors">
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Google Font Import */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&display=swap"
        rel="stylesheet"
      />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes gentle-sway {
          0%, 100% { transform: rotate(-0.5deg); }
          50% { transform: rotate(0.5deg); }
        }
        @keyframes leaf-drift {
          0%, 100% { transform: rotate(-2deg) translateY(0); }
          50% { transform: rotate(2deg) translateY(-3px); }
        }
        @keyframes butterfly-path {
          0% { transform: translate(0, 0) rotate(-5deg); }
          25% { transform: translate(8px, -12px) rotate(0deg); }
          50% { transform: translate(16px, -4px) rotate(5deg); }
          75% { transform: translate(8px, 8px) rotate(0deg); }
          100% { transform: translate(0, 0) rotate(-5deg); }
        }
        @keyframes wing-beat {
          0%, 100% { transform: scaleX(1) rotateY(0deg); }
          50% { transform: scaleX(0.4) rotateY(40deg); }
        }
        @keyframes fade-float {
          0%, 100% { opacity: 0.4; transform: translateY(0); }
          50% { opacity: 0.7; transform: translateY(-5px); }
        }
        @keyframes leaf-sway {
          0%, 100% { transform: rotate(-3deg) translateX(0); }
          25% { transform: rotate(2deg) translateX(1px); }
          50% { transform: rotate(4deg) translateX(-1px); }
          75% { transform: rotate(-1deg) translateX(1px); }
        }
        @keyframes leaf-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.9; }
          25% { transform: translateY(30px) rotate(45deg) translateX(10px); opacity: 0.8; }
          50% { transform: translateY(60px) rotate(-30deg) translateX(-5px); opacity: 0.7; }
          75% { transform: translateY(90px) rotate(60deg) translateX(15px); opacity: 0.5; }
          100% { transform: translateY(120px) rotate(-45deg) translateX(0); opacity: 0; }
        }
      `}</style>
    </main>
  );
}

// Organic Tree with Staged Animation
function OrganicTree({ stage }: { stage: number }) {
  return (
    <svg viewBox="0 0 500 600" className="w-full h-auto" style={{ maxHeight: '65vh' }}>
      <defs>
        {/* Bark texture gradient */}
        <linearGradient id="bark" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5C4033" />
          <stop offset="20%" stopColor="#6B4F3A" />
          <stop offset="40%" stopColor="#7A5D42" />
          <stop offset="60%" stopColor="#6B4F3A" />
          <stop offset="80%" stopColor="#5C4033" />
          <stop offset="100%" stopColor="#4D3428" />
        </linearGradient>

        {/* Branch gradient */}
        <linearGradient id="branch" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5C4033" />
          <stop offset="50%" stopColor="#6B4F3A" />
          <stop offset="100%" stopColor="#5C4033" />
        </linearGradient>

        {/* Fall leaf colors - yellow, ochre, orange, rust */}
        <linearGradient id="fall1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8B830" />
          <stop offset="100%" stopColor="#D4A020" />
        </linearGradient>
        <linearGradient id="fall2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#D4943A" />
          <stop offset="100%" stopColor="#C4842A" />
        </linearGradient>
        <linearGradient id="fall3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#CC7A35" />
          <stop offset="100%" stopColor="#B86A25" />
        </linearGradient>
        <linearGradient id="fall4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8A040" />
          <stop offset="100%" stopColor="#D89030" />
        </linearGradient>
        <linearGradient id="fall5" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#F0C850" />
          <stop offset="100%" stopColor="#E0B840" />
        </linearGradient>
        <linearGradient id="fall6" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C85A30" />
          <stop offset="100%" stopColor="#B04A20" />
        </linearGradient>
      </defs>

      {/* Ground layers - trunk merges smoothly into ground */}
      <defs>
        <linearGradient id="groundFade" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5C4033" stopOpacity="0.4" />
          <stop offset="40%" stopColor="#6B5A4A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#D4C4A8" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="trunkBase" cx="50%" cy="0%" r="100%">
          <stop offset="0%" stopColor="#5C4033" />
          <stop offset="60%" stopColor="#6B4F3A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#D4C4A8" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft ground shadow layers */}
      <ellipse cx="250" cy="590" rx="180" ry="25" fill="#C4B498" opacity="0.15" />
      <ellipse cx="250" cy="585" rx="140" ry="18" fill="#B4A488" opacity="0.2" />
      <ellipse cx="250" cy="580" rx="100" ry="12" fill="#A49478" opacity="0.25" />

      {/* === TRUNK === Stage 1 */}
      <g
        style={{
          opacity: stage >= 1 ? 1 : 0,
          transition: 'opacity 1.2s ease-out',
        }}
      >
        {/* Ground merge - soft fade at trunk base */}
        <ellipse cx="250" cy="575" rx="55" ry="18" fill="url(#trunkBase)" opacity="0.7" />
        <ellipse cx="250" cy="572" rx="45" ry="12" fill="#6B4F3A" opacity="0.4" />

        {/* Main trunk - organic, asymmetrical shape - wider at base, fades into ground */}
        <path
          d="M205 585
             C212 550 218 500 225 450
             C230 400 228 350 236 300
             C242 270 240 250 245 230
             L255 230
             C260 250 258 270 264 300
             C272 350 270 400 275 450
             C282 500 288 550 295 585
             Q270 592 250 592 Q230 592 205 585
             Z"
          fill="url(#bark)"
        />

        {/* Soft edges at trunk base for smooth merge */}
        <ellipse cx="250" cy="582" rx="48" ry="10" fill="#5C4033" opacity="0.5" />
        <ellipse cx="250" cy="585" rx="52" ry="8" fill="#6B4F3A" opacity="0.3" />

        {/* Trunk texture - knots and lines */}
        <ellipse cx="248" cy="480" rx="10" ry="14" fill="#4D3428" opacity="0.3" />
        <ellipse cx="255" cy="380" rx="7" ry="11" fill="#4D3428" opacity="0.25" />
        <ellipse cx="242" cy="520" rx="8" ry="10" fill="#4D3428" opacity="0.2" />
        <path d="M230 550 Q238 480 235 420" stroke="#4D3428" strokeWidth="2" fill="none" opacity="0.2" />
        <path d="M270 540 Q265 460 268 400" stroke="#4D3428" strokeWidth="1.5" fill="none" opacity="0.15" />
        <path d="M250 560 Q252 500 250 450" stroke="#4D3428" strokeWidth="1" fill="none" opacity="0.1" />

        {/* Subtle root hints that blend into ground */}
        <path d="M210 580 Q185 586 160 582" stroke="#6B4F3A" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M290 580 Q315 586 340 582" stroke="#6B4F3A" strokeWidth="8" fill="none" strokeLinecap="round" opacity="0.4" />
        <path d="M220 582 Q200 588 175 585" stroke="#7A5D42" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.3" />
        <path d="M280 582 Q300 588 325 585" stroke="#7A5D42" strokeWidth="5" fill="none" strokeLinecap="round" opacity="0.3" />
      </g>

      {/* === BRANCHES === Stage 2 - Tapering branches (thick to thin) */}
      <g
        style={{
          opacity: stage >= 2 ? 1 : 0,
          transform: stage >= 2 ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 1s ease-out',
        }}
      >
        {/* LEFT MAJOR BRANCH - tapers from 18px to 3px */}
        <path
          d="M238 292
             Q200 270 160 290 Q130 303 100 300
             L100 306
             Q130 312 160 306 Q200 290 238 308
             Z"
          fill="url(#bark)"
        />
        {/* Left sub-branch 1 - tapers */}
        <path
          d="M160 294 Q142 268 122 258 L120 262 Q140 274 158 302 Z"
          fill="url(#bark)"
        />
        {/* Left sub-branch 2 - tapers */}
        <path
          d="M130 306 Q112 324 82 336 L80 340 Q110 330 132 312 Z"
          fill="url(#bark)"
        />
        {/* Left tiny twigs */}
        <path d="M120 260 Q105 250 95 248" stroke="url(#branch)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M110 265 Q100 275 88 280" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M85 338 Q70 345 60 352" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* RIGHT MAJOR BRANCH - tapers from 18px to 3px */}
        <path
          d="M262 292
             Q300 270 340 290 Q370 303 400 300
             L400 306
             Q370 312 340 306 Q300 290 262 308
             Z"
          fill="url(#bark)"
        />
        {/* Right sub-branch 1 - tapers */}
        <path
          d="M340 294 Q358 268 378 258 L380 262 Q360 274 342 302 Z"
          fill="url(#bark)"
        />
        {/* Right sub-branch 2 - tapers */}
        <path
          d="M370 306 Q388 324 418 336 L420 340 Q390 330 368 312 Z"
          fill="url(#bark)"
        />
        {/* Right tiny twigs */}
        <path d="M380 260 Q395 250 405 248" stroke="url(#branch)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M390 265 Q400 275 412 280" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M415 338 Q430 345 440 352" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* UPPER LEFT BRANCH - tapers */}
        <path
          d="M240 252 Q208 212 172 194 L168 198 Q205 218 242 258 Z"
          fill="url(#bark)"
        />
        {/* Upper left sub-branches - tapers */}
        <path
          d="M170 192 Q152 172 132 166 L130 169 Q150 177 168 198 Z"
          fill="url(#bark)"
        />
        <path
          d="M168 196 Q158 214 140 232 L143 235 Q162 218 172 200 Z"
          fill="url(#bark)"
        />
        {/* Upper left tiny twigs */}
        <path d="M132 167 Q118 158 108 155" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M142 233 Q130 245 118 252" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* UPPER RIGHT BRANCH - tapers */}
        <path
          d="M260 252 Q292 212 328 194 L332 198 Q295 218 258 258 Z"
          fill="url(#bark)"
        />
        {/* Upper right sub-branches - tapers */}
        <path
          d="M330 192 Q348 172 368 166 L370 169 Q350 177 332 198 Z"
          fill="url(#bark)"
        />
        <path
          d="M332 196 Q342 214 360 232 L357 235 Q338 218 328 200 Z"
          fill="url(#bark)"
        />
        {/* Upper right tiny twigs */}
        <path d="M368 167 Q382 158 392 155" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M358 233 Q370 245 382 252" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

        {/* CENTER UPWARD BRANCH - tapers */}
        <path
          d="M244 232 Q244 185 244 142 L256 142 Q256 185 256 232 Z"
          fill="url(#bark)"
        />
        {/* Center left sub-branch - tapers */}
        <path
          d="M246 182 Q228 152 212 132 L208 135 Q226 158 244 188 Z"
          fill="url(#bark)"
        />
        {/* Center right sub-branch - tapers */}
        <path
          d="M254 182 Q272 152 288 132 L292 135 Q274 158 256 188 Z"
          fill="url(#bark)"
        />
        {/* Top left twig - tapers */}
        <path
          d="M246 142 Q238 112 230 92 L234 90 Q242 110 250 140 Z"
          fill="url(#bark)"
        />
        {/* Top right twig - tapers */}
        <path
          d="M254 142 Q262 112 270 92 L266 90 Q258 110 250 140 Z"
          fill="url(#bark)"
        />
        {/* Very fine twigs at tips */}
        <path d="M210 133 Q195 118 185 110" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M290 133 Q305 118 315 110" stroke="url(#branch)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        <path d="M231 91 Q222 78 215 70" stroke="url(#branch)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M269 91 Q278 78 285 70" stroke="url(#branch)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M250 142 Q250 125 250 115" stroke="url(#branch)" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M250 115 Q245 100 240 88" stroke="url(#branch)" strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M250 115 Q255 100 260 88" stroke="url(#branch)" strokeWidth="1" fill="none" strokeLinecap="round" />
      </g>

      {/* === FALL LEAVES === Stage 3+ */}
      <g
        style={{
          opacity: stage >= 3 ? 1 : 0,
          transition: 'opacity 1.5s ease-out',
        }}
      >
        {/* ============================================== */}
        {/* TEARDROP SHAPE CANOPY - Full coverage */}
        {/* Widest at y~160, narrow at top & bottom */}
        {/* ============================================== */}

        {/* LAYER 1: APEX - Very narrow top (y: 45-65, width: 60px) */}
        <HandDrawnLeaf x={230} y={48} size={10} rot={-15} color={1} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={238} y={52} size={11} rot={-10} color={2} delay={0.14} opacity={1} />
        <HandDrawnLeaf x={245} y={46} size={10} rot={-5} color={3} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={250} y={44} size={12} rot={0} color={4} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={255} y={46} size={10} rot={5} color={5} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={262} y={52} size={11} rot={10} color={6} delay={0.14} opacity={1} />
        <HandDrawnLeaf x={270} y={48} size={10} rot={15} color={1} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={235} y={55} size={10} rot={-8} color={2} delay={0.16} opacity={1} />
        <HandDrawnLeaf x={250} y={52} size={11} rot={0} color={3} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={265} y={55} size={10} rot={8} color={4} delay={0.16} opacity={1} />
        <HandDrawnLeaf x={242} y={60} size={10} rot={-5} color={5} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={250} y={58} size={10} rot={0} color={6} delay={0.15} opacity={1} />
        <HandDrawnLeaf x={258} y={60} size={10} rot={5} color={1} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={225} y={62} size={10} rot={-18} color={2} delay={0.2} opacity={1} />
        <HandDrawnLeaf x={275} y={62} size={10} rot={18} color={3} delay={0.2} opacity={1} />

        {/* LAYER 2: UPPER (y: 60-90, width: 120px) */}
        <HandDrawnLeaf x={200} y={72} size={10} rot={-35} color={4} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={210} y={68} size={11} rot={-28} color={5} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={218} y={75} size={10} rot={-22} color={6} delay={0.15} opacity={1} />
        <HandDrawnLeaf x={225} y={70} size={11} rot={-18} color={1} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={232} y={78} size={10} rot={-12} color={2} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={240} y={72} size={11} rot={-5} color={3} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={250} y={68} size={12} rot={0} color={4} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={260} y={72} size={11} rot={5} color={5} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={268} y={78} size={10} rot={12} color={6} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={275} y={70} size={11} rot={18} color={1} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={282} y={75} size={10} rot={22} color={2} delay={0.15} opacity={1} />
        <HandDrawnLeaf x={290} y={68} size={11} rot={28} color={3} delay={0.1} opacity={1} />
        <HandDrawnLeaf x={300} y={72} size={10} rot={35} color={4} delay={0.12} opacity={1} />
        <HandDrawnLeaf x={205} y={82} size={10} rot={-32} color={5} delay={0.2} opacity={1} />
        <HandDrawnLeaf x={220} y={85} size={11} rot={-20} color={6} delay={0.22} opacity={1} />
        <HandDrawnLeaf x={235} y={82} size={10} rot={-8} color={1} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={250} y={80} size={11} rot={0} color={2} delay={0.15} opacity={1} />
        <HandDrawnLeaf x={265} y={82} size={10} rot={8} color={3} delay={0.18} opacity={1} />
        <HandDrawnLeaf x={280} y={85} size={11} rot={20} color={4} delay={0.22} opacity={1} />
        <HandDrawnLeaf x={295} y={82} size={10} rot={32} color={5} delay={0.2} opacity={1} />

        {/* LAYER 3: UPPER-MID (y: 85-120, width: 180px) */}
        <HandDrawnLeaf x={175} y={95} size={10} rot={-50} color={6} delay={0.15} opacity={0.98} />
        <HandDrawnLeaf x={185} y={100} size={11} rot={-42} color={1} delay={0.18} opacity={0.98} />
        <HandDrawnLeaf x={195} y={92} size={10} rot={-35} color={2} delay={0.12} opacity={0.98} />
        <HandDrawnLeaf x={205} y={105} size={11} rot={-28} color={3} delay={0.22} opacity={0.98} />
        <HandDrawnLeaf x={215} y={95} size={10} rot={-22} color={4} delay={0.14} opacity={0.98} />
        <HandDrawnLeaf x={225} y={108} size={11} rot={-15} color={5} delay={0.25} opacity={0.98} />
        <HandDrawnLeaf x={235} y={98} size={10} rot={-8} color={6} delay={0.16} opacity={0.98} />
        <HandDrawnLeaf x={245} y={105} size={11} rot={-3} color={1} delay={0.2} opacity={0.98} />
        <HandDrawnLeaf x={250} y={92} size={12} rot={0} color={2} delay={0.1} opacity={0.98} />
        <HandDrawnLeaf x={255} y={105} size={11} rot={3} color={3} delay={0.2} opacity={0.98} />
        <HandDrawnLeaf x={265} y={98} size={10} rot={8} color={4} delay={0.16} opacity={0.98} />
        <HandDrawnLeaf x={275} y={108} size={11} rot={15} color={5} delay={0.25} opacity={0.98} />
        <HandDrawnLeaf x={285} y={95} size={10} rot={22} color={6} delay={0.14} opacity={0.98} />
        <HandDrawnLeaf x={295} y={105} size={11} rot={28} color={1} delay={0.22} opacity={0.98} />
        <HandDrawnLeaf x={305} y={92} size={10} rot={35} color={2} delay={0.12} opacity={0.98} />
        <HandDrawnLeaf x={315} y={100} size={11} rot={42} color={3} delay={0.18} opacity={0.98} />
        <HandDrawnLeaf x={325} y={95} size={10} rot={50} color={4} delay={0.15} opacity={0.98} />
        <HandDrawnLeaf x={180} y={112} size={10} rot={-48} color={5} delay={0.24} opacity={0.98} />
        <HandDrawnLeaf x={200} y={115} size={11} rot={-32} color={6} delay={0.28} opacity={0.98} />
        <HandDrawnLeaf x={220} y={118} size={10} rot={-18} color={1} delay={0.3} opacity={0.98} />
        <HandDrawnLeaf x={240} y={115} size={11} rot={-5} color={2} delay={0.26} opacity={0.98} />
        <HandDrawnLeaf x={250} y={112} size={10} rot={0} color={3} delay={0.22} opacity={0.98} />
        <HandDrawnLeaf x={260} y={115} size={11} rot={5} color={4} delay={0.26} opacity={0.98} />
        <HandDrawnLeaf x={280} y={118} size={10} rot={18} color={5} delay={0.3} opacity={0.98} />
        <HandDrawnLeaf x={300} y={115} size={11} rot={32} color={6} delay={0.28} opacity={0.98} />
        <HandDrawnLeaf x={320} y={112} size={10} rot={48} color={1} delay={0.24} opacity={0.98} />

        {/* LAYER 4: WIDEST MIDDLE (y: 115-165, width: 240px) - MAXIMUM WIDTH */}
        <HandDrawnLeaf x={140} y={130} size={10} rot={-65} color={2} delay={0.18} opacity={0.95} />
        <HandDrawnLeaf x={152} y={138} size={11} rot={-58} color={3} delay={0.22} opacity={0.95} />
        <HandDrawnLeaf x={165} y={125} size={10} rot={-52} color={4} delay={0.14} opacity={0.95} />
        <HandDrawnLeaf x={175} y={142} size={11} rot={-45} color={5} delay={0.28} opacity={0.95} />
        <HandDrawnLeaf x={188} y={130} size={10} rot={-38} color={6} delay={0.16} opacity={0.95} />
        <HandDrawnLeaf x={198} y={148} size={11} rot={-30} color={1} delay={0.32} opacity={0.95} />
        <HandDrawnLeaf x={210} y={135} size={10} rot={-22} color={2} delay={0.2} opacity={0.95} />
        <HandDrawnLeaf x={222} y={152} size={11} rot={-15} color={3} delay={0.35} opacity={0.95} />
        <HandDrawnLeaf x={235} y={138} size={10} rot={-8} color={4} delay={0.24} opacity={0.95} />
        <HandDrawnLeaf x={245} y={155} size={11} rot={-3} color={5} delay={0.38} opacity={0.95} />
        <HandDrawnLeaf x={250} y={125} size={12} rot={0} color={6} delay={0.12} opacity={0.95} />
        <HandDrawnLeaf x={250} y={145} size={11} rot={0} color={1} delay={0.3} opacity={0.95} />
        <HandDrawnLeaf x={255} y={155} size={11} rot={3} color={2} delay={0.38} opacity={0.95} />
        <HandDrawnLeaf x={265} y={138} size={10} rot={8} color={3} delay={0.24} opacity={0.95} />
        <HandDrawnLeaf x={278} y={152} size={11} rot={15} color={4} delay={0.35} opacity={0.95} />
        <HandDrawnLeaf x={290} y={135} size={10} rot={22} color={5} delay={0.2} opacity={0.95} />
        <HandDrawnLeaf x={302} y={148} size={11} rot={30} color={6} delay={0.32} opacity={0.95} />
        <HandDrawnLeaf x={312} y={130} size={10} rot={38} color={1} delay={0.16} opacity={0.95} />
        <HandDrawnLeaf x={325} y={142} size={11} rot={45} color={2} delay={0.28} opacity={0.95} />
        <HandDrawnLeaf x={335} y={125} size={10} rot={52} color={3} delay={0.14} opacity={0.95} />
        <HandDrawnLeaf x={348} y={138} size={11} rot={58} color={4} delay={0.22} opacity={0.95} />
        <HandDrawnLeaf x={360} y={130} size={10} rot={65} color={5} delay={0.18} opacity={0.95} />
        {/* Fill middle density */}
        <HandDrawnLeaf x={145} y={155} size={10} rot={-62} color={6} delay={0.3} opacity={0.92} />
        <HandDrawnLeaf x={160} y={160} size={11} rot={-55} color={1} delay={0.35} opacity={0.92} />
        <HandDrawnLeaf x={178} y={158} size={10} rot={-45} color={2} delay={0.28} opacity={0.92} />
        <HandDrawnLeaf x={195} y={165} size={11} rot={-35} color={3} delay={0.4} opacity={0.92} />
        <HandDrawnLeaf x={212} y={160} size={10} rot={-25} color={4} delay={0.32} opacity={0.92} />
        <HandDrawnLeaf x={228} y={168} size={11} rot={-15} color={5} delay={0.42} opacity={0.92} />
        <HandDrawnLeaf x={242} y={162} size={10} rot={-5} color={6} delay={0.36} opacity={0.92} />
        <HandDrawnLeaf x={250} y={165} size={12} rot={0} color={1} delay={0.38} opacity={0.92} />
        <HandDrawnLeaf x={258} y={162} size={10} rot={5} color={2} delay={0.36} opacity={0.92} />
        <HandDrawnLeaf x={272} y={168} size={11} rot={15} color={3} delay={0.42} opacity={0.92} />
        <HandDrawnLeaf x={288} y={160} size={10} rot={25} color={4} delay={0.32} opacity={0.92} />
        <HandDrawnLeaf x={305} y={165} size={11} rot={35} color={5} delay={0.4} opacity={0.92} />
        <HandDrawnLeaf x={322} y={158} size={10} rot={45} color={6} delay={0.28} opacity={0.92} />
        <HandDrawnLeaf x={340} y={160} size={11} rot={55} color={1} delay={0.35} opacity={0.92} />
        <HandDrawnLeaf x={355} y={155} size={10} rot={62} color={2} delay={0.3} opacity={0.92} />

        {/* LAYER 5: LOWER-WIDE (y: 165-210, width: 220px) - Starting to narrow */}
        <HandDrawnLeaf x={150} y={185} size={10} rot={-60} color={3} delay={0.22} opacity={0.8} />
        <HandDrawnLeaf x={165} y={192} size={11} rot={-52} color={4} delay={0.28} opacity={0.8} />
        <HandDrawnLeaf x={180} y={180} size={10} rot={-45} color={5} delay={0.18} opacity={0.8} />
        <HandDrawnLeaf x={195} y={198} size={11} rot={-35} color={6} delay={0.35} opacity={0.8} />
        <HandDrawnLeaf x={210} y={185} size={10} rot={-28} color={1} delay={0.22} opacity={0.8} />
        <HandDrawnLeaf x={225} y={205} size={11} rot={-18} color={2} delay={0.4} opacity={0.8} />
        <HandDrawnLeaf x={238} y={190} size={10} rot={-10} color={3} delay={0.26} opacity={0.8} />
        <HandDrawnLeaf x={250} y={182} size={12} rot={0} color={4} delay={0.2} opacity={0.8} />
        <HandDrawnLeaf x={250} y={200} size={11} rot={0} color={5} delay={0.35} opacity={0.8} />
        <HandDrawnLeaf x={262} y={190} size={10} rot={10} color={6} delay={0.26} opacity={0.8} />
        <HandDrawnLeaf x={275} y={205} size={11} rot={18} color={1} delay={0.4} opacity={0.8} />
        <HandDrawnLeaf x={290} y={185} size={10} rot={28} color={2} delay={0.22} opacity={0.8} />
        <HandDrawnLeaf x={305} y={198} size={11} rot={35} color={3} delay={0.35} opacity={0.8} />
        <HandDrawnLeaf x={320} y={180} size={10} rot={45} color={4} delay={0.18} opacity={0.8} />
        <HandDrawnLeaf x={335} y={192} size={11} rot={52} color={5} delay={0.28} opacity={0.8} />
        <HandDrawnLeaf x={350} y={185} size={10} rot={60} color={6} delay={0.22} opacity={0.8} />

        {/* LAYER 6: NARROWING (y: 205-250, width: 180px) */}
        <HandDrawnLeaf x={165} y={225} size={10} rot={-55} color={1} delay={0.25} opacity={0.65} />
        <HandDrawnLeaf x={182} y={235} size={11} rot={-45} color={2} delay={0.32} opacity={0.65} />
        <HandDrawnLeaf x={198} y={220} size={10} rot={-35} color={3} delay={0.2} opacity={0.65} />
        <HandDrawnLeaf x={215} y={240} size={11} rot={-25} color={4} delay={0.38} opacity={0.65} />
        <HandDrawnLeaf x={232} y={228} size={10} rot={-15} color={5} delay={0.28} opacity={0.65} />
        <HandDrawnLeaf x={250} y={218} size={12} rot={0} color={6} delay={0.22} opacity={0.65} />
        <HandDrawnLeaf x={250} y={238} size={11} rot={0} color={1} delay={0.4} opacity={0.65} />
        <HandDrawnLeaf x={268} y={228} size={10} rot={15} color={2} delay={0.28} opacity={0.65} />
        <HandDrawnLeaf x={285} y={240} size={11} rot={25} color={3} delay={0.38} opacity={0.65} />
        <HandDrawnLeaf x={302} y={220} size={10} rot={35} color={4} delay={0.2} opacity={0.65} />
        <HandDrawnLeaf x={318} y={235} size={11} rot={45} color={5} delay={0.32} opacity={0.65} />
        <HandDrawnLeaf x={335} y={225} size={10} rot={55} color={6} delay={0.25} opacity={0.65} />

        {/* LAYER 7: LOWER NARROW (y: 245-290, width: 140px) */}
        <HandDrawnLeaf x={185} y={265} size={10} rot={-48} color={1} delay={0.28} opacity={0.5} />
        <HandDrawnLeaf x={205} y={275} size={11} rot={-35} color={2} delay={0.35} opacity={0.5} />
        <HandDrawnLeaf x={225} y={260} size={10} rot={-22} color={3} delay={0.22} opacity={0.5} />
        <HandDrawnLeaf x={250} y={255} size={12} rot={0} color={4} delay={0.2} opacity={0.5} />
        <HandDrawnLeaf x={250} y={275} size={10} rot={0} color={5} delay={0.38} opacity={0.5} />
        <HandDrawnLeaf x={275} y={260} size={10} rot={22} color={6} delay={0.22} opacity={0.5} />
        <HandDrawnLeaf x={295} y={275} size={11} rot={35} color={1} delay={0.35} opacity={0.5} />
        <HandDrawnLeaf x={315} y={265} size={10} rot={48} color={2} delay={0.28} opacity={0.5} />

        {/* LAYER 8: BOTTOM SPARSE (y: 285-320, width: 100px) */}
        <HandDrawnLeaf x={210} y={300} size={10} rot={-35} color={3} delay={0.3} opacity={0.35} />
        <HandDrawnLeaf x={235} y={295} size={11} rot={-18} color={4} delay={0.25} opacity={0.35} />
        <HandDrawnLeaf x={250} y={290} size={10} rot={0} color={5} delay={0.2} opacity={0.35} />
        <HandDrawnLeaf x={250} y={310} size={10} rot={0} color={6} delay={0.4} opacity={0.35} />
        <HandDrawnLeaf x={265} y={295} size={11} rot={18} color={1} delay={0.25} opacity={0.35} />
        <HandDrawnLeaf x={290} y={300} size={10} rot={35} color={2} delay={0.3} opacity={0.35} />

        {/* ============================================== */}
        {/* BRANCH COVERAGE - Leaves on all branches */}
        {/* ============================================== */}

        {/* LEFT MAJOR BRANCH (x: 100-200, y: 285-315) */}
        <HandDrawnLeaf x={105} y={295} size={11} rot={-70} color={1} delay={0.1} opacity={0.7} />
        <HandDrawnLeaf x={112} y={302} size={10} rot={-65} color={2} delay={0.15} opacity={0.7} />
        <HandDrawnLeaf x={118} y={288} size={11} rot={-72} color={3} delay={0.12} opacity={0.7} />
        <HandDrawnLeaf x={125} y={308} size={10} rot={-62} color={4} delay={0.2} opacity={0.7} />
        <HandDrawnLeaf x={132} y={295} size={11} rot={-68} color={5} delay={0.14} opacity={0.7} />
        <HandDrawnLeaf x={140} y={302} size={10} rot={-58} color={6} delay={0.22} opacity={0.65} />
        <HandDrawnLeaf x={148} y={288} size={11} rot={-55} color={1} delay={0.16} opacity={0.65} />
        <HandDrawnLeaf x={155} y={305} size={10} rot={-52} color={2} delay={0.25} opacity={0.65} />
        <HandDrawnLeaf x={165} y={292} size={11} rot={-48} color={3} delay={0.18} opacity={0.6} />
        <HandDrawnLeaf x={175} y={300} size={10} rot={-42} color={4} delay={0.28} opacity={0.6} />
        <HandDrawnLeaf x={185} y={288} size={11} rot={-38} color={5} delay={0.2} opacity={0.55} />
        <HandDrawnLeaf x={195} y={298} size={10} rot={-32} color={6} delay={0.3} opacity={0.55} />

        {/* LEFT UPPER SUB-BRANCH (x: 95-130, y: 248-280) */}
        <HandDrawnLeaf x={98} y={252} size={10} rot={-75} color={1} delay={0.12} opacity={0.75} />
        <HandDrawnLeaf x={105} y={258} size={11} rot={-70} color={2} delay={0.18} opacity={0.75} />
        <HandDrawnLeaf x={112} y={248} size={10} rot={-78} color={3} delay={0.1} opacity={0.75} />
        <HandDrawnLeaf x={118} y={265} size={11} rot={-68} color={4} delay={0.22} opacity={0.7} />
        <HandDrawnLeaf x={125} y={255} size={10} rot={-72} color={5} delay={0.14} opacity={0.7} />
        <HandDrawnLeaf x={95} y={272} size={10} rot={-80} color={6} delay={0.2} opacity={0.7} />
        <HandDrawnLeaf x={102} y={278} size={11} rot={-75} color={1} delay={0.25} opacity={0.65} />
        <HandDrawnLeaf x={88} y={282} size={10} rot={-82} color={2} delay={0.28} opacity={0.65} />

        {/* LEFT LOWER SUB-BRANCH (x: 60-130, y: 320-355) */}
        <HandDrawnLeaf x={65} y={345} size={10} rot={-85} color={3} delay={0.15} opacity={0.6} />
        <HandDrawnLeaf x={72} y={338} size={11} rot={-80} color={4} delay={0.2} opacity={0.6} />
        <HandDrawnLeaf x={80} y={350} size={10} rot={-78} color={5} delay={0.25} opacity={0.55} />
        <HandDrawnLeaf x={88} y={332} size={11} rot={-75} color={6} delay={0.18} opacity={0.6} />
        <HandDrawnLeaf x={95} y={345} size={10} rot={-72} color={1} delay={0.28} opacity={0.55} />
        <HandDrawnLeaf x={105} y={328} size={11} rot={-68} color={2} delay={0.22} opacity={0.55} />
        <HandDrawnLeaf x={115} y={340} size={10} rot={-62} color={3} delay={0.3} opacity={0.5} />
        <HandDrawnLeaf x={125} y={322} size={11} rot={-58} color={4} delay={0.25} opacity={0.5} />

        {/* RIGHT MAJOR BRANCH (x: 300-400, y: 285-315) */}
        <HandDrawnLeaf x={395} y={295} size={11} rot={70} color={5} delay={0.1} opacity={0.7} />
        <HandDrawnLeaf x={388} y={302} size={10} rot={65} color={6} delay={0.15} opacity={0.7} />
        <HandDrawnLeaf x={382} y={288} size={11} rot={72} color={1} delay={0.12} opacity={0.7} />
        <HandDrawnLeaf x={375} y={308} size={10} rot={62} color={2} delay={0.2} opacity={0.7} />
        <HandDrawnLeaf x={368} y={295} size={11} rot={68} color={3} delay={0.14} opacity={0.7} />
        <HandDrawnLeaf x={360} y={302} size={10} rot={58} color={4} delay={0.22} opacity={0.65} />
        <HandDrawnLeaf x={352} y={288} size={11} rot={55} color={5} delay={0.16} opacity={0.65} />
        <HandDrawnLeaf x={345} y={305} size={10} rot={52} color={6} delay={0.25} opacity={0.65} />
        <HandDrawnLeaf x={335} y={292} size={11} rot={48} color={1} delay={0.18} opacity={0.6} />
        <HandDrawnLeaf x={325} y={300} size={10} rot={42} color={2} delay={0.28} opacity={0.6} />
        <HandDrawnLeaf x={315} y={288} size={11} rot={38} color={3} delay={0.2} opacity={0.55} />
        <HandDrawnLeaf x={305} y={298} size={10} rot={32} color={4} delay={0.3} opacity={0.55} />

        {/* RIGHT UPPER SUB-BRANCH (x: 370-405, y: 248-280) */}
        <HandDrawnLeaf x={402} y={252} size={10} rot={75} color={5} delay={0.12} opacity={0.75} />
        <HandDrawnLeaf x={395} y={258} size={11} rot={70} color={6} delay={0.18} opacity={0.75} />
        <HandDrawnLeaf x={388} y={248} size={10} rot={78} color={1} delay={0.1} opacity={0.75} />
        <HandDrawnLeaf x={382} y={265} size={11} rot={68} color={2} delay={0.22} opacity={0.7} />
        <HandDrawnLeaf x={375} y={255} size={10} rot={72} color={3} delay={0.14} opacity={0.7} />
        <HandDrawnLeaf x={405} y={272} size={10} rot={80} color={4} delay={0.2} opacity={0.7} />
        <HandDrawnLeaf x={398} y={278} size={11} rot={75} color={5} delay={0.25} opacity={0.65} />
        <HandDrawnLeaf x={412} y={282} size={10} rot={82} color={6} delay={0.28} opacity={0.65} />

        {/* RIGHT LOWER SUB-BRANCH (x: 370-440, y: 320-355) */}
        <HandDrawnLeaf x={435} y={345} size={10} rot={85} color={1} delay={0.15} opacity={0.6} />
        <HandDrawnLeaf x={428} y={338} size={11} rot={80} color={2} delay={0.2} opacity={0.6} />
        <HandDrawnLeaf x={420} y={350} size={10} rot={78} color={3} delay={0.25} opacity={0.55} />
        <HandDrawnLeaf x={412} y={332} size={11} rot={75} color={4} delay={0.18} opacity={0.6} />
        <HandDrawnLeaf x={405} y={345} size={10} rot={72} color={5} delay={0.28} opacity={0.55} />
        <HandDrawnLeaf x={395} y={328} size={11} rot={68} color={6} delay={0.22} opacity={0.55} />
        <HandDrawnLeaf x={385} y={340} size={10} rot={62} color={1} delay={0.3} opacity={0.5} />
        <HandDrawnLeaf x={375} y={322} size={11} rot={58} color={2} delay={0.25} opacity={0.5} />

        {/* UPPER LEFT DIAGONAL BRANCH (x: 108-175, y: 155-235) */}
        <HandDrawnLeaf x={110} y={158} size={10} rot={-78} color={3} delay={0.1} opacity={0.85} />
        <HandDrawnLeaf x={118} y={165} size={11} rot={-72} color={4} delay={0.15} opacity={0.85} />
        <HandDrawnLeaf x={125} y={155} size={10} rot={-80} color={5} delay={0.08} opacity={0.85} />
        <HandDrawnLeaf x={130} y={172} size={11} rot={-68} color={6} delay={0.2} opacity={0.8} />
        <HandDrawnLeaf x={138} y={162} size={10} rot={-75} color={1} delay={0.12} opacity={0.8} />
        <HandDrawnLeaf x={145} y={178} size={11} rot={-62} color={2} delay={0.25} opacity={0.75} />
        <HandDrawnLeaf x={152} y={168} size={10} rot={-70} color={3} delay={0.18} opacity={0.75} />
        <HandDrawnLeaf x={160} y={185} size={11} rot={-58} color={4} delay={0.28} opacity={0.7} />
        <HandDrawnLeaf x={118} y={195} size={10} rot={-75} color={5} delay={0.22} opacity={0.75} />
        <HandDrawnLeaf x={125} y={205} size={11} rot={-70} color={6} delay={0.28} opacity={0.7} />
        <HandDrawnLeaf x={132} y={215} size={10} rot={-65} color={1} delay={0.32} opacity={0.65} />
        <HandDrawnLeaf x={140} y={225} size={11} rot={-60} color={2} delay={0.35} opacity={0.6} />
        <HandDrawnLeaf x={125} y={235} size={10} rot={-68} color={3} delay={0.38} opacity={0.55} />
        <HandDrawnLeaf x={118} y={248} size={11} rot={-72} color={4} delay={0.4} opacity={0.5} />

        {/* UPPER RIGHT DIAGONAL BRANCH (x: 325-392, y: 155-235) */}
        <HandDrawnLeaf x={390} y={158} size={10} rot={78} color={5} delay={0.1} opacity={0.85} />
        <HandDrawnLeaf x={382} y={165} size={11} rot={72} color={6} delay={0.15} opacity={0.85} />
        <HandDrawnLeaf x={375} y={155} size={10} rot={80} color={1} delay={0.08} opacity={0.85} />
        <HandDrawnLeaf x={370} y={172} size={11} rot={68} color={2} delay={0.2} opacity={0.8} />
        <HandDrawnLeaf x={362} y={162} size={10} rot={75} color={3} delay={0.12} opacity={0.8} />
        <HandDrawnLeaf x={355} y={178} size={11} rot={62} color={4} delay={0.25} opacity={0.75} />
        <HandDrawnLeaf x={348} y={168} size={10} rot={70} color={5} delay={0.18} opacity={0.75} />
        <HandDrawnLeaf x={340} y={185} size={11} rot={58} color={6} delay={0.28} opacity={0.7} />
        <HandDrawnLeaf x={382} y={195} size={10} rot={75} color={1} delay={0.22} opacity={0.75} />
        <HandDrawnLeaf x={375} y={205} size={11} rot={70} color={2} delay={0.28} opacity={0.7} />
        <HandDrawnLeaf x={368} y={215} size={10} rot={65} color={3} delay={0.32} opacity={0.65} />
        <HandDrawnLeaf x={360} y={225} size={11} rot={60} color={4} delay={0.35} opacity={0.6} />
        <HandDrawnLeaf x={375} y={235} size={10} rot={68} color={5} delay={0.38} opacity={0.55} />
        <HandDrawnLeaf x={382} y={248} size={11} rot={72} color={6} delay={0.4} opacity={0.5} />

        {/* BOTTOM CENTER - Near trunk base (x: 215-285, y: 320-400) */}
        <HandDrawnLeaf x={225} y={325} size={10} rot={-25} color={1} delay={0.2} opacity={0.4} />
        <HandDrawnLeaf x={238} y={332} size={11} rot={-15} color={2} delay={0.25} opacity={0.4} />
        <HandDrawnLeaf x={250} y={320} size={10} rot={0} color={3} delay={0.18} opacity={0.4} />
        <HandDrawnLeaf x={262} y={332} size={11} rot={15} color={4} delay={0.25} opacity={0.4} />
        <HandDrawnLeaf x={275} y={325} size={10} rot={25} color={5} delay={0.2} opacity={0.4} />
        <HandDrawnLeaf x={232} y={345} size={10} rot={-20} color={6} delay={0.3} opacity={0.35} />
        <HandDrawnLeaf x={250} y={338} size={11} rot={0} color={1} delay={0.28} opacity={0.35} />
        <HandDrawnLeaf x={268} y={345} size={10} rot={20} color={2} delay={0.3} opacity={0.35} />
        <HandDrawnLeaf x={240} y={358} size={10} rot={-12} color={3} delay={0.35} opacity={0.3} />
        <HandDrawnLeaf x={250} y={355} size={10} rot={0} color={4} delay={0.32} opacity={0.3} />
        <HandDrawnLeaf x={260} y={358} size={10} rot={12} color={5} delay={0.35} opacity={0.3} />
        <HandDrawnLeaf x={245} y={372} size={10} rot={-8} color={6} delay={0.4} opacity={0.25} />
        <HandDrawnLeaf x={255} y={372} size={10} rot={8} color={1} delay={0.4} opacity={0.25} />
        <HandDrawnLeaf x={250} y={385} size={10} rot={0} color={2} delay={0.45} opacity={0.2} />
        <HandDrawnLeaf x={242} y={395} size={9} rot={-5} color={3} delay={0.48} opacity={0.15} />
        <HandDrawnLeaf x={258} y={395} size={9} rot={5} color={4} delay={0.48} opacity={0.15} />

        {/* A few falling leaves animation */}
        <HandDrawnLeaf x={150} y={420} size={10} rot={45} color={1} delay={0} falling />
        <HandDrawnLeaf x={280} y={440} size={12} rot={-30} color={2} delay={1.5} falling />
        <HandDrawnLeaf x={350} y={410} size={10} rot={55} color={3} delay={3} falling />
        <HandDrawnLeaf x={200} y={450} size={10} rot={-45} color={4} delay={2} falling />
        <HandDrawnLeaf x={320} y={430} size={12} rot={25} color={5} delay={4} falling />
      </g>

    </svg>
  );
}

// Gentle Butterfly Component
function GentleButterfly({ className, delay, color }: { className?: string; delay: number; color: string }) {
  return (
    <div
      className={className}
      style={{
        animation: `butterfly-path ${12 + delay * 2}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
        width: '24px',
        height: '24px',
      }}
    >
      <svg viewBox="0 0 24 24" className="w-full h-full">
        {/* Wings */}
        <ellipse
          cx="8"
          cy="11"
          rx="6"
          ry="5"
          fill={color}
          opacity="0.7"
          style={{ animation: 'wing-beat 0.4s ease-in-out infinite', transformOrigin: '12px 12px' }}
        />
        <ellipse
          cx="16"
          cy="11"
          rx="6"
          ry="5"
          fill={color}
          opacity="0.7"
          style={{ animation: 'wing-beat 0.4s ease-in-out infinite 0.2s', transformOrigin: '12px 12px' }}
        />
        {/* Lower wings */}
        <ellipse cx="9" cy="15" rx="4" ry="3" fill={color} opacity="0.5" style={{ animation: 'wing-beat 0.4s ease-in-out infinite' }} />
        <ellipse cx="15" cy="15" rx="4" ry="3" fill={color} opacity="0.5" style={{ animation: 'wing-beat 0.4s ease-in-out infinite 0.2s' }} />
        {/* Body */}
        <ellipse cx="12" cy="12" rx="1.5" ry="6" fill="#5A5A5A" opacity="0.6" />
      </svg>
    </div>
  );
}

// Hand-drawn style fall leaf component with opacity support for fading
function HandDrawnLeaf({
  x, y, size, rot, color, delay, falling = false, opacity = 0.9
}: {
  x: number; y: number; size: number; rot: number; color: number; delay: number; falling?: boolean; opacity?: number;
}) {
  // Fall colors array
  const fallColors = [
    '#E8B830', // golden yellow
    '#D4943A', // ochre
    '#CC7A35', // orange-brown
    '#E8A040', // amber
    '#F0C850', // bright yellow
    '#C85A30', // rust
  ];

  const leafColor = fallColors[(color - 1) % 6];
  const veinColor = color <= 3 ? '#B8860B' : '#8B6914';

  // Slight variations for hand-drawn feel
  const w = size * 0.7;
  const h = size * 1.2;

  return (
    <g transform={`translate(${x}, ${y}) rotate(${rot})`} opacity={opacity}>
      {/* Main leaf shape - simple oval with point */}
      <ellipse
        cx={0}
        cy={0}
        rx={w}
        ry={h}
        fill={leafColor}
        style={{
          animation: falling
            ? `leaf-fall ${8 + delay * 2}s ease-in-out infinite`
            : `leaf-sway ${3 + delay}s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
      {/* Leaf tip */}
      <path
        d={`M${-w * 0.3} ${-h} Q0 ${-h * 1.4} ${w * 0.3} ${-h}`}
        fill={leafColor}
      />
      {/* Leaf vein */}
      <line
        x1={0}
        y1={-h * 0.8}
        x2={0}
        y2={h * 0.6}
        stroke={veinColor}
        strokeWidth={0.5}
        opacity={0.5}
      />
    </g>
  );
}
