import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F5F3EF] font-sans overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-50 px-8 py-6">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <span className="text-brand-yellow font-bold text-lg">🦁</span>
               </div>
               <span className="font-bold text-xl tracking-tight text-black underline decoration-2 underline-offset-4">Jufo Grafing</span>
            </div>
            
            <div className="hidden md:flex items-center gap-10 font-medium text-sm text-black">
                <a href="#" className="hover:underline underline-offset-4 decoration-2">Events</a>
                <a href="#" className="hover:underline underline-offset-4 decoration-2">Über uns</a>
                <a href="#" className="hover:underline underline-offset-4 decoration-2">Galerie</a>
                <Button variant="primary" className="h-10 px-6 text-sm bg-white hover:bg-gray-50">Kontakt</Button>
            </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-28 pb-32 min-h-[85vh]">
        
        {/* Left Yellow Circle - Large, positioned behind text */}
        <div className="absolute -top-[5%] -left-[5%] w-[45vw] h-[45vw] max-w-[1200px] max-h-[1200px] bg-brand-yellow rounded-full -z-10" />
        
        {/* Right Yellow Circle - Massive, positioned for images to sit on */}
        <div className="absolute top-[15%] -right-[15%] w-[55vw] h-[55vw] max-w-[800px] max-h-[800px] bg-brand-yellow rounded-full -z-10" />

        <div className="max-w-[1400px] mx-auto px-8 grid md:grid-cols-2 gap-8 items-start pt-16">
          
          {/* Left Content - Text */}
          <div className="space-y-8 relative z-10">
            <h1 className="text-6xl md:text-[5.5rem] font-extrabold leading-[0.95] text-black tracking-tight">
              Willkommen<br />
              bei dem<br />
              Jugendforum<br />
              Grafing
            </h1>

            <p className="text-base text-black/80 max-w-sm leading-relaxed">
              Hier findest du alle Infos über uns und zu kommenden Aktionen. Sowie eine Galerie zu bereits Stattgefundenen Aktionen.
            </p>

            <Button variant="primary" className="h-12 px-6 text-sm bg-white hover:bg-gray-50 border border-black rounded-full shadow-none">
               Newsletter <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Right Content - Image Collage */}
          <div className="relative h-[550px] w-full hidden md:flex items-center justify-center">
             
             {/* Image 1 - Left, Vertical, Blue tint */}
             <div className="absolute left-[5%] top-[10%] w-44 h-60 bg-black rounded-[1.5rem] border-4 border-black shadow-xl overflow-hidden z-20">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 1" />
             </div>

             {/* Image 2 - Center, Larger, Tilted */}
             <div className="absolute left-[25%] top-[5%] w-48 h-64 bg-black rounded-[1.5rem] border-4 border-black shadow-xl overflow-hidden rotate-6 z-30">
                <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 2" />
             </div>
             
             {/* Image 3 - Right, Largest, Tilted opposite */}
             <div className="absolute right-[5%] top-[0%] w-52 h-72 bg-black rounded-[1.5rem] border-4 border-black shadow-xl overflow-hidden -rotate-3 z-40">
                <img src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover" alt="Portrait 3" />
             </div>

             {/* Decorative Yellow Circle - Small */}
             <div className="absolute left-[40%] top-[2%] w-8 h-8 bg-brand-yellow rounded-full border-4 border-black z-50" />
             
             {/* Decorative Lilac Circle - Medium */}
             <div className="absolute right-[25%] bottom-[20%] w-20 h-20 bg-brand-lilac rounded-full border-4 border-black z-50" />
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section className="py-16 px-8 max-w-[1400px] mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card - Bewerben */}
            <Card className="h-[400px] group relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
               
               <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-2xl font-bold text-white">Bewerben</h3>
                     <ArrowRight className="text-white w-6 h-6" />
                  </div>
                  <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </div>
            </Card>

            {/* Card - Aktionen */}
            <Card className="h-[400px] group relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
               
               <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-2xl font-bold text-white">Aktionen</h3>
                     <ArrowRight className="text-white w-6 h-6" />
                  </div>
                  <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </div>
            </Card>

            {/* Card - Turnierplanner */}
            <Card className="h-[400px] group relative overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
               
               <div className="relative z-10 h-full flex flex-col justify-end p-8">
                  <div className="flex items-center justify-between mb-3">
                     <h3 className="text-2xl font-bold text-white">Turnierplanner</h3>
                     <ArrowRight className="text-white w-6 h-6" />
                  </div>
                  <p className="text-gray-300 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </div>
            </Card>
         </div>

         {/* See All Button */}
         <div className="flex justify-center mt-12">
            <Button className="h-12 px-8 bg-brand-yellow text-black border-2 border-black rounded-lg font-bold hover:bg-yellow-400 shadow-none">
               See all
            </Button>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-yellow border-t-2 border-black py-8 px-8 mt-12">
         <div className="max-w-[1400px] mx-auto flex justify-between items-center font-bold text-sm">
            <span className="underline decoration-2 underline-offset-4">Jufo Grafing</span>
            <div className="flex gap-6">
               <a href="#">Events</a>
               <a href="#">Pricing</a>
               <a href="#">Gallery</a>
               <Button size="sm" variant="primary" className="h-8 px-4 text-xs bg-white border border-black rounded-full shadow-none">Contact</Button>
            </div>
         </div>
      </footer>
    </div>
  );
}
