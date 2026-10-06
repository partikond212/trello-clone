 import { useState, useEffect} from 'react'

const wordsArr= ['Саморазвитие','Культура `новых` подростков',"Добро и зло",'Искусственный интеллект','Мастер и Маргарита','Портфолио']
type Args = (
words?:string[],
typingSpeed?:number,
pauseDuration?:number,
deletingSpeed?:number,
) =>string
const useTypewriter:Args = (words=wordsArr,typingSpeed=240,pauseDuration=1000,deletingSpeed=220) => {
const [charIndex,setCharIndex] = useState(0)
const [currentWord,setCurrentWord] = useState(0)
const [isDeleting,setIsDeleting] = useState(false)

useEffect(() => {
  const delay = isDeleting
  ? deletingSpeed
  : charIndex === words[currentWord].length
    ? pauseDuration
    : typingSpeed;

const id = setTimeout(() => {
    if(isDeleting === false && charIndex < words[currentWord].length) {
        setCharIndex((prev)=>prev + 1);
    }
     
   else if(isDeleting === false && charIndex === words[currentWord].length) {
        setIsDeleting(true)
    }
    else if(isDeleting &&charIndex > 0 ) {
          setCharIndex((prev)=>prev - 1);
    }
    else if(isDeleting &&charIndex === 0 ) {
        setIsDeleting(false)
        setCurrentWord((prev) => (prev + 1) % words.length)

       
    }


}, delay);

    return () => clearTimeout(id)
},[charIndex,currentWord,isDeleting,deletingSpeed,pauseDuration,words,typingSpeed])

return words[currentWord].slice(0, charIndex)


};

export default useTypewriter;