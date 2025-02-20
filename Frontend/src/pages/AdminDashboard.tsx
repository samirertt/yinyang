import NavBar from '../components/NavBar';
import SmallBoxesBox from '../components/SmallBoxes Box';
import MostUsedBox from '../components/MostUsed Box';

function AdminDashboard()
{
    return(
        <div >
            <NavBar/>
            <div className='pageContainer' style={{display:'flex', gap:'71px', alignItems:'center', justifyContent:'center'}}>
                <SmallBoxesBox/>
                <MostUsedBox/>
            </div>
        </div>
    )
}

export default AdminDashboard;