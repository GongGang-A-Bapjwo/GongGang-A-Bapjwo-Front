import FreeTimeNotice from '../conponents/FreeTimeNotice';
import BoardNotice from '../conponents/BoardNotice';
import HorizontalScroll from '../conponents/HorizontalScroll';
import PromiseBoard from '../conponents/PromiseBoard';
import ToggleSwitch from '../conponents/ToggleSwitch';

const Today = () => {
    // console.log("Today");
    return (
        <>
            <FreeTimeNotice />
            <ToggleSwitch />
            <BoardNotice />
            <HorizontalScroll />
            <PromiseBoard />
        </>
    )
}

export default Today;