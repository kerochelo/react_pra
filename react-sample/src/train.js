// import React, {Fragment} from 'react';
import React from 'react';
import ReactDOM from 'react-dom';
import './train.css';
import * as serviceWorker from './serviceWorker';
serviceWorker.unregister();


/*
function Page(props){
  const user = props.user;
  const content = <Feed user={user} />;
  const topBar = (
    <NavgationBar>
      <Link href={user.permaLink}>
        <Avatar user={user} avatarSize={props.avatarSize} />
      </Link>
    </NavgationBar>
  );

  return(
    <PageLayout
      topBar={topBar}
      content={content}
    />
  );
}
*/

// resolve multi layer component before use context
/*
function Page(props){
  const user = props.user;
  const link = (
    <Link href={user.permaLink}>
      <Avatar user={this.user} avatarSize={props.avatarSize} />
    </Link>
  );
  return <PageLayout userLink={this.link} />
}

function PageLayout(props){
  return(
    <NavigationBar userLink={props.userLink} />
  );
}

function NavgationBar(props){
  return {props.userLink};
}
*/


// example resolve multi layer component before use context
/*
function Page(props){
  return(
    <PageLayout user={props.user} avatarSize={props.avatarSize} />
  );
}

function PageLayout(props){
  return(
    <NavgationBar user={props.user} avatarSize={props.avatarSize} />
  );
}

function NavgationBar(props){
  return(
    <Link href={props.user.permaLink}>
      <Avatar user={props.user} avatarSize={props.avatarSize} />
    </Link>
  );
}
*/

// when with context
/*
const ThemeContext = React.createContext('light');

class App extends React.Component{
  render(){
    return(
      <ThemeContext.Provider value="dark">
        <ToolBox />
      </ThemeContext.Provider>
    );
  }
}

function ToolBox(){
  return(
    <div>
      <ThemedButton />
    </div>
  );
}

class ThemedButton extends React.Component{

  static contentType = ThemeContext;

  render(){
    return(
      // 一番近くのコンテクストを持ってくる
      <Button theme={this.context} />
    );
  }
}

function Button(props){
  return(
    <button />
    );
}

ReactDOM.render(
  <App />,
  document.getElementById('train')
);
*/


// onBlur example for focus
/*
class BlurExample extends React.Component{
  constructor(props){
    super(props);
    this.state = (
      {isOpen: false}
    );
    this.timeOutId = null;
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler(){
    this.setState(currentState => (
      {isOpen: !currentState.isOpen}
    ));
  }

  onBlurHandler(){
    this.timeOutId = setTimeout(() => {
      this.setState(
        {isOpen: false}
      );
    });
  }

  onFocusHandler(){
    clearTimeout(this.timeOutId);
  }

  render(){
    return(
      <div
        onBlur={this.onBlurHandler}
        onFocus={this.onFocusHandler}
      >
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select
        </button>
        {this.state.isOpen && (
          <ul>
            <li>option1</li>
            <li>option2</li>
            <li>option3</li>
          </ul>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <BlurExample />,
  document.getElementById('train')
);
*/

// event of mouse and pointer
/*
class OuterClick extends React.Component{
  constructor(props){
    super(props);
    this.state = (
      {isOpen: false}
    );
    this.toggleContainer = React.createRef();
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onClickOutsideHandler = this.onClickOutsideHandler.bind(this);
  }

  componentDidMount(){
    window.addEventListener('click', this.onClickOutsideHandler);
  }

  componentWillUnmount(){
    window.removeEventListener('click', this.onClickOutsideHandler);
  }

  onClickHandler(){
    this.setState(currentState => ({
      isOpen: !currentState.isOpen
    }));
  }

  onClickOutsideHandler(event){
    if(this.state.isOpen && !this.toggleContainer.current.contains(event.target)){
      this.setState(
        {isOpen: false}
      );
    }
  }

  render(){
    return(
      <div ref={this.toggleContainer}>
        <button onClick={this.onClickHandler}>Select</button>
        {this.state.isOpen && (
          <ul>
            <li>option1</li>
            <li>option2</li>
            <li>option3</li>
          </ul>
        )}
      </div>
    );
  }
}

ReactDOM.render(
  <OuterClick />,
  document.getElementById('train')
);
*/


// accesibility
/*
function CustomTextInput(props){
  return(
    <div>
      <input type="text" ref={props.inputRef} />
    </div>
  );
}

class Parent extends React.Component{
  constructor(props){
    super(props);
    this.inputElement = React.createRef();
  }

  render(){
    return(
      <div>
        <CustomTextInput inputRef={this.inputElement} />
      </div>
    );
  }
}

// 必要な時は
this.inputElement.current.focus();

ReactDOM.render(
  <Parent />,
  document.getElementById('train')
);
*/


// fragment
/*
function ListItem({item}){
  return(
    <Fragment> // <>でも可能(propsがない && ツールがサポートしている)
      <dt>{item.term}</dt>
      <dd>{item.description}</dd>
    </Fragment> // </>でも可能
  );
}

function Grocery(props){
  return(
    <dl>
      {props.items.map(item => {
        return(
          <ListItem item={item} key={item.id} />
        );
      })}
    </dl>
  );
}

const items = [
  {id: 1, term: "sprint2", description: "view"},
  {id: 2, term: "sprint1", description: "controller"},
  {id: 3, term: "sprint1", description: "model"}
];

ReactDOM.render(
  <Grocery items={items} />,
  document.getElementById('train')
);
*/


// real timer
/*
class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount(){
    this.timerID = setInterval(
      () => this.tick(),
      1000
  	);
  }

  componentWillUnmount(){
    clearInterval(this.timerID);
  }

  tick(){
    this.setState({
	  date: new Date()
    });
  }

  render(){
    return (
	    <div>
        <p>Hello React</p>
		    <p>{this.state.date.toLocaleTimeString()}</p>
	    </div>
	  );
  }
}

// ========================================

ReactDOM.render(
  <Clock />,
  document.getElementById('train')
);
*/


// chk track link
/*
function ActionLink(){
  function handleClick(e){
    e.preventDefault();
	  alert('this link was clicked');
  }

  return(
    <a href="#" onClick={handleClick}>click me</a>
  );
}

ReactDOM.render(
  <ActionLink />,
  document.getElementById('train')
);
*/


// switch on or off
/*
class Toggle extends React.Component{
  constructor(props){
    super(props);
	  this.state = {
	    isToggleOn: true
    };
    // クラスメソッドはデフォルトでバインドされない、callbackでthisを使うためバインドする
	  this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    this.setState(state => ({
	    isToggleOn: !state.isToggleOn
    }))
  }

  render(){
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' :'OFF'}
      </button>
    )
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('train')
);
*/

// logged in or logged out
/*
function UserGreeting(props){
  return (
    <p>Hello React!</p>
  )
}

function GuestGreeting(props){
  return (
    <p>Please Login!</p>
  );
}

function Greeting(props){
  const isLogin = props.isLogin;

  if(isLogin){
    return <UserGreeting />;
  }
  return <GuestGreeting />;
}

function LoginButton(props){
  return (
    <button onClick={props.onClick}>Login</button>
  );
}

function LogoutButton(props){
  return (
    <button onClick={props.onClick}>Logout</button>
  );
}

class LoginControl extends React.Component{
  constructor(props){
    super(props);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = {
      isLogin: false
    };
  }

  handleLoginClick(){
    this.setState({
      isLogin: true
    });
  }

  handleLogoutClick(){
    this.setState({
      isLogin: false
    });
  }

  render(){
    const isLogin = this.state.isLogin;
    let btn;

    if(isLogin){
      btn = <LogoutButton onClick={this.handleLogoutClick} />
    }else{
      btn = <LoginButton onClick={this.handleLoginClick} />
    }

    return (
      <div>
        <Greeting isLogin={isLogin} />
        {btn}
      </div>
    );
  }
}

ReactDOM.render(
  <LoginControl />,
  document.getElementById('train')
);
*/

// note unread message
/*
function Mailbox(props){
  const unreadMsg = props.unreadMsg;
  return (
    <div>
      <p>Hello React!</p>
      {unreadMsg > 0 &&
        <p>You have {unreadMsg.length} unread message.</p>
      }
    </div>
  );
}

const msgs = ["foo", "red", "nir"];

ReactDOM.render(
  <Mailbox unreadMsg={msgs}/>,
  document.getElementById('train')
);
*/

// warning banner
/*
function WarningBanner(props){
  if(!props.warn){
    return null;
  }

  return(
    <div className="alert-danger">
      Warning!
    </div>
  );
}

class Page extends React.Component{
  constructor(props){
    super(props);
    this.handleToggleClick = this.handleToggleClick.bind(this);
    this.state = {
      showWarning: true
    };
  }

  handleToggleClick(){
    this.setState(state => ({
      showWarning: !state.showWarning
    }));
  }

  render(){
    return(
      <div>
        <WarningBanner warn={this.state.showWarning} />
        <button onClick={this.handleToggleClick}>
          {this.state.showWarning ? 'hide' : 'show'}
        </button>
      </div>
    );
  }
}

ReactDOM.render(
  <Page />,
  document.getElementById('train')
);
*/

// array component
/*
const memberNames = ["dave", "nick", "chester", "tom"];
const listItems = memberNames.map((member, index) => {
  return <li key={index}>{member}</li>
});

ReactDOM.render(
  <ul>{listItems}</ul>,
  document.getElementById('train')
);
*/

// list component
/*
function MemberList(props){
  const memberNames = props.members;
  const listItems = memberNames.map((member, index) => {
    return <li key={index}>{member}</li>
  });
  return(
    <ul>{listItems}</ul>
  );
}

const memberNames = ["dave", "nick", "chester", "tom"];
ReactDOM.render(
  <MemberList members={memberNames} />,
  document.getElementById('train')
);
*/


// key
/*
const numbers = [1,2,3,4,5];
const listNumber = numbers.map(number => {
  return <li key={number.toString()}>{number}</li>
});

const todos = [
  {id: 1, text: "a"},
  {id: 2, text: "b"},
  {id: 3, text: "c"},
  {id: 4, text: "d"},
  {id: 5, text: "e"}
];
const todoItem = todos.map(todo => {
  return <li key={todo.id}>{todo.text}</li>
});


ReactDOM.render(
  <ul>{todoItem}</ul>,
  document.getElementById('train')
);
*/

// not proper key position
/*
function ListItem(props){
  const value = props.value;
  return(
    <li key={value.toString()}>{value}</li>
  );
}

function NumberList(props){
  const numbers = props.numbers;
  const listItems = numbers.map(number => {
    return <ListItem value={number} />;
  });
  return(
    <ul>{listItems}</ul>
  );
}


const numbers = [1,2,3,4,5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('train')
);
*/


// correct proper key position
/*
function ListItem(props){
  return(
    <li>{props.value}</li>
  );
}

function NumberList(props){
  const numbers = props.numbers;
  const listItems = numbers.map(number => {
    return (
    <ListItem
      key={number.toString()}
      value={number}
    />
    );
  });
  return(
    <ul>{listItems}</ul>
  );
}

const numbers = [1,2,3,4,5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById('train')
);
*/

// unique key between brothers
/*
function Blog(props){
  const sidebar = (
    <ul>
      {props.posts.map(post =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );

  const content = props.posts.map(post =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );

  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: "hello", content: "react"},
  {id: 2, title: "bye", content: "javascript"}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('train')
);
*/

// props key value
/*
const content = posts.map(post => 
  <Post
    key={post.id} // cannot read
    id={post.id} // can read
    title={post.title}
  />
);
*/

// embeded map()
/*
function NumberList(props){
  const numbers = props.numbers:
  const listItems = numbers.map(number => 
    <ListItem 
      key={number.toString()}
      value={number}
    />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
}

function NumberList(props){
  const numbers = props.numbers:
  return (
    <ul>
      {numbers.map(number => 
        <ListItem 
          key={number.toString()}
          value={number}
        />
      )}
    </ul>
  );
}
*/

// log text
/*
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = (
      {value: ''}
    );

  }

  handleChange(event) {
    this.setState(
      {value: event.target.value}
    );
  }

  handleSubmit(event) {
    alert(`A name was submitted:${this.state.value}`);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <NameForm />,
  document.getElementById('train')
);
*/

// log textarea
/*
class AreaForm extends React.Component{
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      value: 'Please write everything about your favorite thing.'
    };
  }

  handleChange(event) {
    this.setState(
      {value: event.target.value}
    );
  }

  handleSubmit(event) {
    alert('An essay was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Essay:
          <textarea
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <AreaForm />,
  document.getElementById('train')
);
*/


// log select
/*
class SelectForm extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = (
      {value: ''}
    );
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }

  handleSubmit(event){
    alert(`Your favorite type is ${this.state.value}`);
    event.preventDefault();
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite type.
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="red">red</option>
            <option value="blue">blue</option>
            <option value="green">green</option>
            <option value="yellow">yellow</option>
            <option value="white">white</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}


ReactDOM.render(
  <SelectForm />,
  document.getElementById('train')
);
*/

// multi form controll
/*
class Reservation extends React.Component{
  constructor(props){
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.state = {
      isGoing: true,
      numberOfGuest: 2
    };
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(
      {[name]: value}
    );
  }

  render(){
    return(
      <form>
        <label>
          Is going:
          <input
            name="isGoing"
            type="checkbox"
            checked={this.state.isGoing}
            onChange={this.handleInputChange}
          />
        </label>
        <br />
        <label>
          Number of guest:
          <input
            name="numberOfGuest"
            type="number"
            value={this.state.numberOfGuest}
            onChange={this.handleInputChange}
          />
        </label>
      </form>
    );
  }
}

ReactDOM.render(
  <Reservation />,
  document.getElementById('train')
);
*/

//  about null
/*
ReactDOM.render(<input value="hi" />, mountNode);

setTimeout(function() {
  ReactDOM.render(<input value={null} />, mountNode);
}, 1000);
*/

// liftup state
/*
const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit){
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenehit(celsius){
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert){
  const input = parseFloat(temperature);
  if(Number.isNaN(input)){
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props){
  if(props.celsius >= 100){
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.props.onTemperatureChange(e.target.value);
  }

  render(){
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return(
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}.</legend>
        <input
          value={temperature}
          onChange={this.handleChange}
        />
      </fieldset>
    );
  }
}

class Calculator extends React.Component{
  constructor(props){
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {
      temperature: '',
      scale: 'c'
    };
  }

  handleCelsiusChange(temperature){
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature){
    this.setState({scale: 'f', temperature});
  }

  render(){
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenehit) : temperature;
    return(
      <div>
        <TemperatureInput
          scale='c'
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange}
        />
        <TemperatureInput
          scale='f'
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange}
        />
        <BoilingVerdict celsius={parseFloat(celsius)} />
      </div>
    );
  }
}

ReactDOM.render(
  <Calculator />,
  document.getElementById('train')
);
*/

// render child factor
/*
function Fancyborder(props){
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  );
}

function WelcomeDialog(){
  return(
    <Fancyborder color="blue">
      <h1 className="Dialog-title">
        Welcome
      </h1>
      <p className="Dialog-message">
        Hello React
      </p>
    </Fancyborder>
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('train')
);
*/

// create org child factor
/*
function Contacts(){
  return(
    <div className="Contacts">
      <p>about contact</p>
    </div>
  );
}

function Chat(){
  return(
    <div className="Chat">
      <p>chat</p>
    </div>
  );
}

function SplitPane(props){
  return(
    <div className="SplitPane">
      <div className="SplitPane-left">
        {props.left}
      </div>
      <div className="SplitPane-right">
        {props.right}
      </div>
    </div>
  );
}

function App(){
  return(
    <SplitPane
      left={<Contacts />}
      right={<Chat />}
    />
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('train')
);
*/

// specialized component
/*
function Dialog(props){
  return(
    <div className="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
    </div>
  );
}

function WelcomeDialog(){
  return(
    <Dialog
      title="welcome"
      message="hello react"
    />
  );
}

ReactDOM.render(
  <WelcomeDialog />,
  document.getElementById('train')
);
*/

// specialized class component
/*
function Fancyborder(props){
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
    </div>
  );
}

function Dialog(props){
  return(
    <Fancyborder color="blue">
      <h1 className="Dialog-title">
        {props.title}
      </h1>
      <p className="Dialog-message">
        {props.message}
      </p>
      {props.children}
    </Fancyborder>
  );
}

class SignUpDialog extends React.Component{
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = (
      {login: ''}
    );
  }

  handleChange(e){
    this.setState(
      {login: e.target.value}
    );
  }

  handleSignUp(){
    alert(`welcome a board ${this.state.login}`);
  }

  render(){
    return(
      <Dialog
        title="XYZ Program"
        message="How should we refer to you?"
      >
        <input
          value={this.state.login}
          onChange={this.handleChange}
        />
        <button onClick={this.handleSignUp}>
          Sign me up.
        </button>
      </Dialog>
    );
  }
}

ReactDOM.render(
  <SignUpDialog />,
  document.getElementById('train')
);
*/