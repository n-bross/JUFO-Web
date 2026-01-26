import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Logo } from "@/components/ui/Logo";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] font-sans overflow-x-hidden relative">
      
      {/* Background Yellow Circles - Matching Figma Design */}
      {/* Large Left Circle - Behind Hero Text */}
      <div className="absolute -top-[10%] -left-[15%] w-[650px] h-[650px] bg-brand-yellow rounded-full" />
      
      {/* Large Right Circle - Behind Images */}
      <div className="absolute top-[5%] -right-[20%] w-[750px] h-[750px] bg-brand-yellow rounded-full" />

      {/* Navigation */}
      <nav className="relative z-50 px-8 py-6">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo size={40} />
            <span className="font-bold text-lg tracking-tight text-black underline decoration-2 underline-offset-4">Jufo Grafing</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-black">
            <a href="#" className="hover:underline underline-offset-4 decoration-2">Events</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2">Über uns</a>
            <a href="#" className="hover:underline underline-offset-4 decoration-2">Galerie</a>
            <Button variant="primary" className="h-9 px-5 text-sm bg-white hover:bg-gray-50 border-2 border-black rounded-full font-medium">Kontakt</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-8 pb-24 min-h-[80vh]">
        <div className="max-w-[1200px] mx-auto px-8 grid md:grid-cols-2 gap-8 items-start">
          
          {/* Left Content - Text */}
          <div className="space-y-6 relative z-10 pt-8">
            <h1 className="text-5xl md:text-[4.5rem] font-extrabold leading-[1.0] text-black tracking-tight">
              Willkommen<br />
              bei dem<br />
              Jugendforum<br />
              Grafing
            </h1>

            <p className="text-sm text-black/70 max-w-xs leading-relaxed">
              Hier findest du alle Infos über uns und zu kommenden Aktionen. Sowie eine Galerie zu bereits Stattgefundenen Aktionen.
            </p>

            <Button variant="primary" className="h-10 px-5 text-sm bg-white hover:bg-gray-50 border-2 border-black rounded-full shadow-none font-medium">
              Newsletter <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right Content - Image Collage (Matching Figma) */}
          <div className="relative h-[450px] w-full hidden md:flex items-center justify-center">
            
            {/* Image 1 - Left, Slightly rotated */}
            <div className="absolute left-[0%] top-[15%] w-40 h-56 rounded-[1.2rem] border-4 border-black shadow-lg overflow-hidden rotate-[-5deg] z-20 bg-black">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 1" />
            </div>

            {/* Image 2 - Center, Tilted right */}
            <div className="absolute left-[28%] top-[5%] w-44 h-60 rounded-[1.2rem] border-4 border-black shadow-lg overflow-hidden rotate-[8deg] z-30 bg-black">
              <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 2" />
            </div>
            
            {/* Image 3 - Right, Tilted left */}
            <div className="absolute right-[0%] top-[8%] w-44 h-60 rounded-[1.2rem] border-4 border-black shadow-lg overflow-hidden rotate-[-3deg] z-40 bg-black">
              <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 3" />
            </div>

            {/* Small Yellow Decorative Circle */}
            <div className="absolute left-[38%] top-[0%] w-6 h-6 bg-brand-yellow rounded-full border-3 border-black z-50" />
            
            {/* Lilac Decorative Circle */}
            <div className="absolute right-[15%] bottom-[15%] w-16 h-16 bg-brand-lilac rounded-full border-4 border-black z-50" />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="relative z-10 py-8 px-8 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card - Bewerben */}
          <Card className="h-[320px] group relative overflow-hidden bg-[#1a1a1a] rounded-[1.2rem] border-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Bewerben</h3>
                <ArrowRight className="text-white w-5 h-5" />
              </div>
              <p className="text-gray-400 text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Card>

          {/* Card - Aktionen */}
          <Card className="h-[320px] group relative overflow-hidden bg-[#1a1a1a] rounded-[1.2rem] border-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Aktionen</h3>
                <ArrowRight className="text-white w-5 h-5" />
              </div>
              <p className="text-gray-400 text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Card>

          {/* Card - Turnierplanner */}
          <Card className="h-[320px] group relative overflow-hidden bg-[#1a1a1a] rounded-[1.2rem] border-0">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            
            <div className="relative z-10 h-full flex flex-col justify-end p-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-white">Turnierplanner</h3>
                <ArrowRight className="text-white w-5 h-5" />
              </div>
              <p className="text-gray-400 text-xs">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </Card>
        </div>
      </section>

      {/* Lorem ipsum section (matching Figma) */}
      <section className="relative z-10 py-12 px-8 max-w-[1200px] mx-auto">
        <div className="flex items-center justify-center gap-4">
          {/* Lilac decorative dot */}
          <div className="w-8 h-8 bg-brand-lilac rounded-full border-3 border-black" />
          <p className="text-lg font-medium text-black">Lorem ipsum dolor sit amet?</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 bg-brand-yellow py-6 px-8 mt-4">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center font-medium text-sm">
          <span className="underline decoration-2 underline-offset-4 font-bold">Jufo Grafing</span>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:underline">Events</a>
            <a href="#" className="hover:underline">Pricing</a>
            <a href="#" className="hover:underline">Gallery</a>
            <Button size="sm" variant="primary" className="h-8 px-4 text-xs bg-white border-2 border-black rounded-full shadow-none font-medium">Contact</Button>
          </div>
        </div>
      </footer>
    </div>
  );
}
