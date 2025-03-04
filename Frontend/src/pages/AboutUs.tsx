
import { GlobeAltIcon, HeartIcon, UsersIcon, SparklesIcon,  CodeBracketIcon,CommandLineIcon,} from '@heroicons/react/24/outline';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-[#212121] text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
            Redefining Human-AI Interaction
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We create empathetic digital beings that learn, grow, and form meaningful connections with users through natural conversation.
          </p>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-[#212121] rounded-x transition-colors">
            <SparklesIcon className="h-12 w-12 text-purple-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Advanced AI Personalities</h3>
            <p className="text-gray-400">
              Our neural networks create unique personalities that evolve through interaction, developing distinct traits and conversation styles.
            </p>
          </div>

          <div className="p-6 bg-[#212121] rounded-x transition-colors">
            <HeartIcon className="h-12 w-12 text-pink-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Emotional Intelligence</h3>
            <p className="text-gray-400">
              Next-generation emotional modeling allows our companions to understand context, tone, and subtle conversational cues.
            </p>
          </div>

          <div className="p-6 bg-[#212121] rounded-x transition-colors">
            <GlobeAltIcon className="h-12 w-12 text-blue-400 mb-4" />
            <h3 className="text-2xl font-bold mb-3">Global Reach</h3>
            <p className="text-gray-400">
              Available in 50+ languages, serving millions of users worldwide with localized cultural understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Visionaries</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A diverse team of Engineers
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
            { icon: CodeBracketIcon, name: "Samir", role: "Engineer" },
            { icon: CommandLineIcon, name: "Luay", role: "Software Developer" },
            { icon: CommandLineIcon, name: "Ustaz ", role: "Software Developer" },
            { icon: CommandLineIcon, name: "Teca", role: "Software Developer" },
        ].map((member, index) => (
            <div key={index} className="group relative">
            <div className="aspect-square bg-gray-800 rounded-xl flex items-center justify-center p-6 hover:bg-gray-700 transition-colors">
                <member.icon className="h-16 w-16 text-purple-400 group-hover:text-purple-300 group-hover:scale-110 transition-all" />
            </div>
            <div className="mt-4 text-center">
                <h4 className="font-bold text-lg">{member.name}</h4>
                <p className="text-gray-400">{member.role}</p>
            </div>
            </div>
        ))}
        </div>
        </section>
      {/* Stats Section */}
      <section className="py-16 bg-[#212121]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-400 mb-2">10M+</div>
              <div className="text-gray-400">Daily Conversations</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-400 mb-2">150+</div>
              <div className="text-gray-400">Unique Personalities</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-pink-400 mb-2">99.9%</div>
              <div className="text-gray-400">Uptime Reliability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <UsersIcon className="h-16 w-16 text-green-400 mx-auto mb-6" />
        <h2 className="text-3xl font-bold mb-6">Join the Conversation Revolution</h2>
        <p className="text-gray-300 mb-8">
          Experience the future of AI interaction. Our companions are waiting to meet you.
        </p>
        <button className="bg-purple-500 hover:bg-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors">
          Start Chatting Now
        </button>
      </section>
    </div>
  );
};

export default AboutUs;