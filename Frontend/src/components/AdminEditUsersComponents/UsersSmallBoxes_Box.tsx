import { useState } from "react";
import UserCard from "./UserCard";
import { motion } from "framer-motion";
import { User } from "../../services/adminService";

interface UsersSmallBoxesBoxProps {
    users: User[];
    moderator: boolean;
    onRoleToggle: (userId: number) => void;
}

function UsersSmallBoxesBox({ users, moderator, onRoleToggle }: UsersSmallBoxesBoxProps) {
    const [direction, setDirection] = useState(1);
    const [page, setPage] = useState(0);
    const numPerPage = 4;

    const filteredUsers = users.filter(user => 
        moderator ? user.role === 'moderator' : user.role === 'user'
    );

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0,
        }),
        center: { x: "0%", opacity: 1 },
        exit: (direction: number) => ({
            x: direction > 0 ? "-100%" : "100%",
            opacity: 0,
        }),
    };

    function pageIncrease() {
        if (page + 1 < Math.max(1, filteredUsers.length / numPerPage)) {
            setPage(page + 1);
            setDirection(1);
        }
    }

    function pageDecrease() {
        if (page >= Math.min(1, Math.ceil(filteredUsers.length / numPerPage))) {
            setPage(page - 1);
            setDirection(-1);
        }
    }

    return (
        <div className='w-[100%] flex flex-col gap-5 items-center'>
            <motion.div
                key={page}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={direction}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-[90%] items-center grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6"
            >
                {filteredUsers.slice(numPerPage * page, numPerPage * (page + 1)).map((user) => (
                    <UserCard
                        key={user.userId}
                        img={user.userImg || "https://cmsassets.rgpub.io/sanity/images/dsfx7636/game_data_live/2acb7715797d4183b09fdbfb902ff52a0aa4e0cf-496x560.jpg?auto=format&fit=fill&q=80&w=352"}
                        name={user.username}
                        Id={user.userId}
                        role={user.role === 'moderator'}
                        onRoleToggle={() => onRoleToggle(user.userId)}
                    />
                ))}
            </motion.div>

            <div className='flex gap-3 items-center'>
                <button className='bg-[#efefef] rounded-full p-[20px]' onClick={pageDecrease}>
                    <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5' alt="Previous" />
                </button>
                <button className='bg-[#efefef] rounded-full p-[20px]' onClick={pageIncrease}>
                    <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5 rotate-180' alt="Next" />
                </button>
            </div>
        </div>
    );
}

export default UsersSmallBoxesBox;
