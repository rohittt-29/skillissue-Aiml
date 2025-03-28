const formatFileName = (fileName) => {
  // Remove file extension and special characters
  const nameWithoutExt = fileName.replace(/\.[^/.]+$/, "");
  // Split by common separators and capitalize each word
  return nameWithoutExt
    .split(/[-_\s]/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const handleFileUpload = (files) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockCandidates = files.map((file) => {
        const formattedName = formatFileName(file.name);
        const cleanName = formattedName.toLowerCase().replace(/\s+/g, '.');
        
        return {
          name: formattedName,
          originalFile: file.name,
          email: `${cleanName}@example.com`,
          phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
          location: ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA'][Math.floor(Math.random() * 4)],
          website: `https://${cleanName}.portfolio.com`,
          experience: Math.floor(Math.random() * 10) + 1,
          skills: [
            'JavaScript',
            'React',
            'Node.js',
            'Python',
            'AWS',
            'Docker',
            'TypeScript',
            'MongoDB',
            'SQL',
            'Git'
          ].sort(() => Math.random() - 0.5).slice(0, Math.floor(Math.random() * 4) + 4),
          matchPercentage: Math.floor(Math.random() * 30) + 70,
          status: ['Shortlisted', 'Under Review', 'Rejected'][Math.floor(Math.random() * 3)],
          analyzed: true,
          experienceTimeline: [
            {
              period: '2021 - Present',
              title: 'Senior Software Engineer',
              company: 'Tech Corp',
              description: 'Led development of cloud-native applications using React and Node.js'
            },
            {
              period: '2019 - 2021',
              title: 'Software Engineer',
              company: 'Innovation Labs',
              description: 'Developed and maintained full-stack web applications'
            },
            {
              period: '2017 - 2019',
              title: 'Junior Developer',
              company: 'StartUp Inc',
              description: 'Worked on front-end development using React and TypeScript'
            }
          ]
        };
      });
      resolve(mockCandidates);
    }, 1500);
  });
};