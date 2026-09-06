import React,{type FC} from 'react';

interface IHeaderProps {
title:string,
actions:React.ReactNode | React.JSX.Element 
}
const Header:FC<IHeaderProps> = ({title,actions}) => {
  return (
    <header>
      <h1>{title}</h1>
      <div>{actions}</div>
      <div className="userImage">
        <img src="https://avatars.mds.yandex.net/i?id=e7e26492e88707b5ad462f32fad7f4765b8afaa1-11379423-images-thumbs&n=13" alt="userAvatar" />
      </div>
    </header>
  );
};

export default Header;