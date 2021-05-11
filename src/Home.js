const home = () => {

    const handleClick = () =>{
        alert("hello, ninjas!");
    }

    const appName = "SkillMeet";
    const appDescription = "Blah blah blah Blah blah blahBlah blah blah Blah blah blah Blah blah blah Blah blah blah Blah blah blahBlah Blah blah blah Blah blah blah Blah blah blah blah blah";
    const appHook = "Blah blah blah Blah blah blahBlah blah blah Blah blah";

    return ( 
        <div className="white-background">
        <div className = "app-name">{appName}</div>
        <div className = "app-description">{appDescription}</div>
        <div className = "app-hook">{appHook}</div>

        <button onClick = {handleClick}>Click Me</button>
        </div>

     );
}
 
export default home;