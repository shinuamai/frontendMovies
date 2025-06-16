import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className='bg-lime-300 flex gap-1 p-1 bg'>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
