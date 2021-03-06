import { useEffect } from 'react';
// CSS 
import './sidebar.css'
const Sidebar = ({ categories, products, setCollection, filterByCategory, setTest }) => {

    return (
        <>
            <div id='sidebar-container'>
                <h3 onClick={() => {setCollection(products); setTest("COLLECTION")}}>All</h3>
                {
                    categories.data?.map(category => (
                        <div className='sidebar' key={category.id}>
                            <h3 onClick={() => {filterByCategory(category.name); setTest(category.name)}}>{category.name}</h3>
                        </div>
                    ))
                }
            </div>
        </>
    );
}

export default Sidebar;
