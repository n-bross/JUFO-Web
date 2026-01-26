import { X, Calendar, Heart } from 'lucide-react';

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

interface MemberModalProps {
  member: Member;
  onClose: () => void;
}

const MemberModal: React.FC<MemberModalProps> = ({ member, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      <div
        className="relative bg-dark-surface rounded-2xl border-4 max-w-lg w-full max-h-[90vh] overflow-y-auto animate-bounce-in hard-shadow-lg"
        style={{ borderColor: member.color }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-dark-elevated rounded-full hover:bg-dark-bg transition-colors z-10"
          aria-label="Schließen"
        >
          <X className="w-5 h-5 text-text-primary" />
        </button>

        {/* Header with Image */}
        <div
          className="relative h-40 rounded-t-xl flex items-center justify-center"
          style={{ backgroundColor: member.color + '20' }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-28 h-28 rounded-full border-4 shadow-lg"
            style={{ borderColor: member.color }}
          />
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Name and Role */}
          <div className="text-center mb-4">
            <h3 className="text-2xl font-bold text-text-primary">{member.name}</h3>
            <span
              className="inline-block mt-2 px-4 py-1 rounded-full text-sm font-medium text-dark-bg"
              style={{ backgroundColor: member.color }}
            >
              {member.role}
            </span>
          </div>

          {/* Bio */}
          <p className="text-text-secondary mb-6 leading-relaxed">{member.bio}</p>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Joined Year */}
            <div className="bg-dark-elevated rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Calendar className="w-4 h-4 text-accent" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">
                  Dabei seit
                </span>
              </div>
              <p className="text-lg font-bold text-text-primary">{member.joinedYear}</p>
            </div>

            {/* Hobbies */}
            <div className="bg-dark-elevated rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-danger" />
                <span className="text-xs text-text-secondary uppercase tracking-wide">
                  Hobbies
                </span>
              </div>
              <div className="flex flex-wrap gap-1">
                {member.hobbies.slice(0, 3).map((hobby, index) => (
                  <span
                    key={index}
                    className="text-xs px-2 py-1 rounded-full bg-dark-bg text-text-secondary"
                  >
                    {hobby}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberModal;
