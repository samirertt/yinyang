import CharacterCard from "./CharacterCard";

function SmallBoxesBox(props: { inputValue: any; characters:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>  })
{

    const searchVal= props.inputValue;
    
    const characters = props.characters;

    function filterArr(arr:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>)
    {
        var bar:Array<{ img: string; name: string; Id: number; details: string; usage:number; }> = arr;
        if(searchVal!=='')
            {
                
                bar = arr.filter(item => item.name.toLowerCase().includes(searchVal.toLowerCase()));
                console.log(bar);
                console.log(searchVal);
            }

        return bar;
    }

    function sortCharArray(arr:Array<{ img: string; name: string; Id: number; details: string; usage:number; }>)
    {
        
        for(var i in arr)
        {
            for(var j in arr)
            {   
                if(arr[i].usage>arr[j].usage)
                {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
                else if(arr[i].Id<arr[j].Id && arr[i].usage==arr[j].usage)
                {
                    var temp = arr[i];
                    arr[i] = arr[j];
                    arr[j] = temp;
                }
            }
        }

        return arr;
    }
    return (
        <div className="grid grid-cols-4 gap-6 max-w-[75%]">
            {sortCharArray(filterArr(characters)).map((index)=>(
                <CharacterCard key={index.Id} {...index}/>
            ))}
        </div>
    )
}

export default SmallBoxesBox;
