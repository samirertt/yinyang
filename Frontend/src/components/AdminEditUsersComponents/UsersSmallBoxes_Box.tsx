import { useState } from "react";
import UserCard from "./UserCard";
import { motion } from "framer-motion";

interface UserModel {
    userId: number;
    username: string;
    password?: string;
    role: string;
    joinDate: string;
    image?: Uint8Array;
}

function UsersSmallBoxesBox(props: { moderator: boolean, users: UserModel[] }) {
    const [direction, setDirection] = useState(1);
    const [users, setUsers] = useState(props.users);

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

    const updateUserRole = async (userId: number, currentRole: boolean) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/users/${userId}/role`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });
            if (response.ok) {
                const updatedUser = await response.json();
                setUsers(users.map(user => 
                    user.userId === userId ? updatedUser : user
                ));
            }
        } catch (error) {
            console.error('Error updating user role:', error);
        }
    };

    function filterUsers(users: UserModel[]) {
        if (props.moderator) {
            return users.filter(user => user.role === "MODERATOR");
        }
        return users;
    }

    const numPerPage = 4;
    const [page, setPage] = useState(0);

    function pageIncrease() {
        if (page + 1 < Math.max(1, filterUsers(users).length / numPerPage)) {
            setPage(page + 1);
            setDirection(1);
        }
    }

    function pageDecrease() {
        if (page >= Math.min(1, Math.ceil(filterUsers(users).length / numPerPage))) {
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
                {filterUsers(users)
                    .slice(numPerPage * page, numPerPage * (page + 1))
                    .map((user) => (
                        <UserCard 
                            user={user} 
                            onUpdate={updateUserRole} 
                            key={user.userId}
                        />
                    ))}
            </motion.div>

            <div className='flex gap-3 items-center'>
                <button className='bg-[#efefef] rounded-full p-[20px]' onClick={pageDecrease}>
                    <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5' alt="" />
                </button>
                <button className='bg-[#efefef] rounded-full p-[20px]' onClick={pageIncrease}>
                    <img src="https://img.icons8.com/?size=100&id=9149&format=png&color=000000" className='w-5 rotate-180' alt="" />
                </button>
            </div>
        </div>
    );
}

export default UsersSmallBoxesBox;
