function CharacterCard(props: { img: string; name: string; Id: number; details: string; usage:number; })
{
    const character = {
        charImage:props.img,
        charName:props.name,
        charId:props.Id,
        charDetails:props.details,
        charUsage:props.usage
    }
    
    return(
        <div className="flex flex-col gap-4 bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md cursor-pointer hover:bg-[#3A3A3A] transition items-center">
            <div className="flex items-center gap-5">
                <div className="w-[100px] h-[100px] rounded-full overflow-hidden flex-shrink-0">
                    <img 
                        src={character.charImage} 
                        className="w-full h-full object-cover" 
                        alt={character.charName}
                    />
                </div>
                <div className="items-center">
                    <h3 className="font-bold">{character.charName}</h3>
                    <p className="text-gray-400">ID: {character.charId}</p>
                    <p className="text-gray-400">Usage: {character.charUsage}</p>
                </div>
            </div>
            <p style={{alignSelf:"center",justifySelf:"center"}} className="font-bold">{character.charDetails}</p>
          </div>
    )
}

export default CharacterCard;