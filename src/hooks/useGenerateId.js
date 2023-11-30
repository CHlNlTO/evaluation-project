import { v4 as uuidv4 } from 'uuid';


export const useGenerateId = () => {
  
  const uniqueId = uuidv4();

  const limitedId = uniqueId.substring(0, 20);

  const numericIdString = limitedId.replace(/\D/g, '');

  const numericId = parseInt(numericIdString, 10);

  return numericId;

}