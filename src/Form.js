const Form = () => {

    return ( 
        <div className="formContent">
            <form action="/">
                    <legend>Add a potential user:</legend>

                    <label for="fname">First name:</label>
                    <input type="text" placeholder="John" id="fname" name="fname" />

                    <label for="lname">Last name:</label>
                    <input type="text" placeholder="Smith" id="lname" name="lname" />

                    <label for="email">Email:</label>
                    <input type="Email" placeholder="johnSmith@gmail.com" id="email" name="email" />

                    <label for="bio">Bio:</label>
                    <textarea placeholder="Tell us something about yourself...." name="bio" id="bio"></textarea>

                    <label for="city">City Name:</label>
                    <input type="text" placeholder="Surrey" id="city" name="city" />

                    <input type="button" id="submit" value="Submit" />
            </form>
        </div>
     );
}
 
export default Form;