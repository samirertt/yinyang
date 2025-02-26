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
                <img src={character.charImage} className="max-w-[100px] mb-4 rounded-full" style={{backgroundColor:'red'}} />
                <div className="items-center">
                    <h3 className="font-bold">{character.charName}</h3>
                    <p className="text-gray-400">ID: {character.charId}</p>
                    <p className="text-gray-400">{character.charUsage}%</p>
                </div>
            </div>
            <p style={{alignSelf:"center",justifySelf:"center"}} className="font-bold">{character.charDetails}</p>
          </div>
    )


}

export default CharacterCard;