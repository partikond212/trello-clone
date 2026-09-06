import {type FC} from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage:FC = () => {
  return (
    <div>
       Страница 404 (вы ввели неверный адрес)
       <Link to='/'>Перейти на главную</Link>
    </div>
  );
};

export default NotFoundPage;