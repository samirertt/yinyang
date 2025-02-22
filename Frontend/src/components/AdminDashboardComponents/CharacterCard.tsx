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
        <div className="grid auto-cols-max grid-cols-3 gap-4 bg-[#2F2F2F] text-[#acacaf] p-6 rounded-xl shadow-md cursor-pointer hover:bg-[#3A3A3A] transition flex flex-col items-center">
            <div className="flex flex-col items-center">
                <img src={character.charImage} className="mb-4 rounded-full" style={{backgroundColor:'red'}} />
                <h3 className="text-xl font-bold text-[clamp(80%,16px,100%)]">{character.charName}</h3>
                <p className="text-sm text-gray-400">ID: {character.charId}</p>
                <p className="text-sm text-gray-400">{character.charUsage}%</p>
            </div>
            <p style={{alignSelf:"center",justifySelf:"center"}} className="col-span-2 font-bold text-[clamp(60%,36px,75%)]">{character.charDetails}</p>
          </div>
    )


}

export default CharacterCard;