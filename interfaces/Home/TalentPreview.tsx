// interfaces/Home/TalentPreview.tsx
import React from "react";

// Ajustando la interfaz para que coincida con TalentProfile
interface TalentPreviewProps {
  talent: {
    address: string;
    pseudonym: string;
    skills: string[];
    rating: number;
    completedJobs: number;
    hourlyRate: number;
    imageUrl?: string; // Opcional si no hay imágenes en el mock
  };
}

export const TalentPreview: React.FC<TalentPreviewProps> = ({ talent }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      {/* Imagen opcional si existe */}
      {talent.imageUrl && (
        <img
          src={talent.imageUrl}
          alt={talent.pseudonym}
          className="w-24 h-24 mx-auto rounded-full mb-4"
        />
      )}
      
      <h3 className="text-xl font-bold">{talent.pseudonym}</h3>
      <p className="text-gray-600">{talent.skills.join(", ")}</p>
      <p className="text-sm text-gray-500">{talent.completedJobs} jobs completed</p>
      <p className="text-lg font-semibold">${talent.hourlyRate}/hr</p>
    </div>
  );
};

export default TalentPreview;
