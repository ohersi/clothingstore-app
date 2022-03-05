import { useEffect } from 'react';
import { Link } from 'react-router-dom'

const Sidebar = ({ categories }) => {

    return (
        <>
            <div id='sidebar-container'>
                <h1>INSIDE SIDEBAR</h1>
                {
                    categories.data?.map(category => (
                        <div className='sidebar' key={category.id}>
                            <h3>{category.name}</h3>
                            <Link to='/'>{category.name}</Link>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Sidebar;
