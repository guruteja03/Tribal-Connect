const artisans = [
  { id: 1, name: 'Sita Devi', specialty: 'Basketry', region: 'Jharkhand' },
  { id: 2, name: 'Ramesh Oraon', specialty: 'Terracotta', region: 'Chhattisgarh' },
  { id: 3, name: 'Meera Lakra', specialty: 'Textiles', region: 'Odisha' },
];

function ArtisanProfilesPage() {
  return (
    <div className="space-y-5">
      <h1 className="section-title">Artisan Profiles</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {artisans.map((artisan) => (
          <div key={artisan.id} className="card">
            <h3 className="font-semibold text-tribal-800">{artisan.name}</h3>
            <p className="text-sm text-tribal-700">Specialty: {artisan.specialty}</p>
            <p className="text-sm text-tribal-700">Region: {artisan.region}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ArtisanProfilesPage;
