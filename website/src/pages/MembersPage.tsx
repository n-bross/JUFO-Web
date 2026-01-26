import { useState } from 'react';
import { Users } from 'lucide-react';
import MemberCard from '../components/MemberCard';
import MemberModal from '../components/MemberModal';
import membersData from '../data/members.json';

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  hobbies: string[];
  joinedYear: number;
  color: string;
}

const MembersPage: React.FC = () => {
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const members: Member[] = membersData;

  return (
    <div className="min-h-screen pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <Users className="w-12 h-12 text-secondary animate-float" />
            <h1 className="text-4xl md:text-5xl font-bold text-text-primary">
              Unsere Mitglieder
            </h1>
          </div>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Lerne die Menschen kennen, die Jufo Grafing zu dem machen, was es ist!
          </p>
        </div>

        {/* Masonry Grid */}
        <div className="masonry-grid">
          {members.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              onClick={() => setSelectedMember(member)}
            />
          ))}
        </div>

        {/* Member Modal */}
        {selectedMember && (
          <MemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </div>
    </div>
  );
};

export default MembersPage;
