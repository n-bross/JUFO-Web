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

interface MemberCardProps {
  member: Member;
  onClick: () => void;
}

const MemberCard: React.FC<MemberCardProps> = ({ member, onClick }) => {
  return (
    <div
      className="masonry-item cursor-pointer group"
      onClick={onClick}
    >
      <div
        className="bg-dark-surface rounded-2xl border-4 overflow-hidden hard-shadow btn-bouncy"
        style={{ borderColor: member.color }}
      >
        {/* Image */}
        <div
          className="relative h-40 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
          style={{ backgroundColor: member.color + '20' }}
        >
          <img
            src={member.image}
            alt={member.name}
            className="w-24 h-24 rounded-full border-4 shadow-lg transition-transform duration-300 group-hover:scale-110"
            style={{ borderColor: member.color }}
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="text-lg font-bold text-text-primary mb-1 group-hover:text-primary transition-colors">
            {member.name}
          </h3>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-medium text-dark-bg"
            style={{ backgroundColor: member.color }}
          >
            {member.role}
          </span>
          <p className="mt-3 text-sm text-text-secondary line-clamp-2">
            {member.bio}
          </p>
          
          {/* Hobbies Preview */}
          <div className="mt-3 flex flex-wrap gap-1">
            {member.hobbies.slice(0, 2).map((hobby, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 rounded-full bg-dark-elevated text-text-secondary"
              >
                {hobby}
              </span>
            ))}
            {member.hobbies.length > 2 && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-dark-elevated text-text-secondary">
                +{member.hobbies.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
