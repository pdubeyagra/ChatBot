"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const testimonials = [
  {
    name: "Manish Chandel",
    avatar: "M",
    title: "Product Manager",
    description: "The AI chatbot has revolutionized how we handle customer support. It's incredibly efficient and always available!",
  },
  {
    name: "Shelendra Tomar",
    avatar: "S",
    title: "Marketing Specialist",
    description: "I love how the chatbot understands context and provides relevant answers. It has greatly improved our user engagement.",
  },
  {
    name: "Saurabh Sharma",
    avatar: "S",
    title: "Customer Service Lead",
    description: "The chatbot's natural language processing is top-notch. It handles inquiries with ease and has significantly reduced response time.",
  },
  {
    name: "Nikhil Singh",
    avatar: "N",
    title: "Tech Enthusiast",
    description: "Impressive AI! The chatbot's ability to adapt and learn from interactions is outstanding. It's like having a personal assistant right at your fingertips.",
  },
];


export const LandingContent = () => {
  return (
    <div className="px-10 pb-20">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">Testimonials</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {testimonials.map((item) => (
          <Card key={item.description} className="bg-[#192339] border-none text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg ">{item.name}</p>
                  <p className="text-zinc-400 text-sm">{item.title}</p>
                </div>
              </CardTitle>
              <CardContent className="pt-4 px-0">{item.description}</CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;