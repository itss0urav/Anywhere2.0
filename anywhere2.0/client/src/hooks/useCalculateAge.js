import { useState, useEffect } from 'react';

const useCalculateAge = (dob) => {
  const [age, setAge] = useState(0);

  useEffect(() => {
    const calculateAge = (dob) => {
      const currentDate = new Date();
      const birthDate = new Date(dob);
      let age = currentDate.getFullYear() - birthDate.getFullYear();
      const monthDiff = currentDate.getMonth() - birthDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && currentDate.getDate() < birthDate.getDate())
      ) {
        age--;
      }
      return age;
    };

    setAge(calculateAge(dob));
  }, [dob]);

  return age;
};

export default useCalculateAge;
