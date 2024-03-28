import { useDispatch, useSelector } from "react-redux";
import { LIGHTGRAY } from "../../COLOR";
import { decrement, increment } from "../../reactRedux/counterSlice";
import img from "../../assets/pexels-nout-gons-378570.jpg";
import img2 from "../../assets/house1.jpg";

const Counter = () => {
  const counter = useSelector((store) => store.counter);

  console.log(10 ** 2);

  const dispatch = useDispatch();
  // return (
  //   <>
  //     {/* <div
  //       style={{
  //         width: "90svw",
  //         backgroundColor: LIGHTGRAY,
  //         margin: "10px auto 0 auto",
  //         padding: "5px",
  //         borderRadius: 10,
  //       }}
  //     >
  //       <h1>Counter: {counter.count}</h1>

  //       <button
  //         type="button"
  //         onClick={() => {
  //           dispatch(increment());
  //         }}
  //       >
  //         Increase
  //       </button>
  //       <button
  //         onClick={() => {
  //           dispatch(decrement());
  //         }}
  //         type="button"
  //       >
  //         Decrease
  //       </button>
  //     </div> */}

  //     <form action="/login" method="GET">
  //       {" "}
  //       {/* Get: data will be send through url and it appends to url and
  //     it has better performance than the post and support 2000 characters only
  //     but post send data throug the body and data is not append to the url and it has no limitation for
  //     character.
  //     default method is get
  //     and we should use name attribute to specify that what data we are sending
  //     example: ?firstName=Mahdi&lastName=Hasanzadeh // this line will be append to the url

  //     input is inline element.

  //     */}
  //       <fieldset>
  //         <legend>Personal Info</legend>
  //         <label for="firstName">First Name: </label>
  //         <input
  //           defaultValue={"mahdi"}
  //           type="text"
  //           id="firstName"
  //           name="firstName"
  //           placeholder="Enter your name"
  //           size="50" // this size shows that input size is 50 characters
  //         />
  //         <label for="lastName">Last Name: </label>
  //         <input
  //           type="text"
  //           name="lastName"
  //           placeholder="Last Name"
  //           id="lastName"
  //         />
  //         <label for="email">Last Name: </label>
  //         <input type="email" name="email" placeholder="Last Name" id="email" />
  //         <br />
  //         <hr />
  //       </fieldset>
  //       <fieldset>
  //         <legend>Option Info</legend>
  //         {/* when we  submit the form the value of gender wil be sent */}
  //         <label for="isMarried">Is Married</label>
  //         <input type="checkbox" name="isMarried" value="true" />
  //         <hr />
  //         <label>Male</label>
  //         <input type="radio" name="gender" value="male" />
  //         <label>Male</label>
  //         <input type="radio" name="gender" value="female" />
  //         {/* to ways to send the data */}
  //         {/* if we don't use the name attribiute for the select element, the data of select element will not be
  //       send to the databse. */}
  //         {/* multiple allow the user to choose multipe option */}
  //         <select multiple name="selectedCity">
  //           <option value="Herat">Herat</option>
  //           <option value="kabul">Kabul</option>
  //           <option value="Mazar">Mazar</option>
  //           <option value="Ghandahar">Ghandahar</option>
  //         </select>
  //         <textarea placeholder="Comment" name="comment" />
  //         {/* ************************** */}
  //         <input type="text" name="fullname" list="suggestedNames" />
  //         <datalist id="suggestedNames">
  //           <option>Mahdi</option>
  //           <option>Ali</option>
  //         </datalist>
  //         {/* ********************* */}
  //         {/* ******************* */}
  //         <input type="submit" value="ok" />
  //         <button type="submit">Submit</button>
  //         {/* reset all the inputs to its primary value */}
  //         <input type="reset" />
  //         {/* this button  */}
  //       </fieldset>
  //     </form>
  //   </>
  // );

  // return (
  //   <>
  //     <h1>Multimedia in html</h1>
  //     {/* iframe allow us to use another webpage inside our page for
  //     example, we can use google map using iframe in our website
  //     */}
  //     <iframe src="googlemap.com"></iframe>
  //     {/* it's better to don't use height for our image beacause it's strech the image but only use width */}
  //     <img
  //       srcSet={img}
  //       style={{
  //         objectFit: "cover",
  //       }}
  //       // src={require("../../assets/pexels-nout-gons-378570.jpg")}
  //       width={"500"}
  //     />
  //     {/* allow as to show different pictures in different screen size */}
  //     <picture>
  //       <source srcSet={img2} media="(min-width: 1024)" />
  //       <source srcSet={img} media="(max-width: 1023)" />
  // <img src="img3" />  // this is the default image if the the two other is not showing on the page.
  // this image will be shown.
  //     </picture>
  //   </>
  // );
  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto",
          gridTemplateRows: "auto auto auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            gridColumn: "1/2",
            gridRow: "1/2",
            backgroundColor: "red",
          }}
        >
          1
        </div>
        <div
          style={{
            gridColumn: "2/4",
            backgroundColor: "blue",
            padding: 5,
          }}
        >
          2
        </div>
        <div
          style={{
            backgroundColor: "green",
            padding: 5,
            gridColumn: "1/span 1",
            gridRow: "2/span 2",
          }}
        >
          3
        </div>
        <div
          style={{
            backgroundColor: "red",
            gridColumn: "2/span 2",
            gridRow: "2/span 1",
          }}
        >
          4
        </div>
        <div>5</div>
      </div>
    </>
  );
};

export default Counter;
