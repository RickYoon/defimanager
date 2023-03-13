import "./index.css";
import lending from "assets/lending/sampleShot.png"
import { Link } from "react-router-dom";

function Lending() {

  return (
    <>
    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" class="navbar w-nav">
    <div class="container-navigation">
      <div class="navigation-left">
        <a href="/" aria-current="page" class="brand w-nav-brand w--current">
            <span style={{fontSize:"20px", fontWeight:"1000"}}>DEFI MANAGER</span>
        </a>
      </div>
      <div class="navigation-right">
        <div class="navigation-button-wrap">
            <Link to={`/wallet`}>
                <button class="button-primary" style={{backgroundColor:"white", color:"black", cursor:"pointer"}} data-wf-user-logout="Log out" data-wf-user-login="Log in" type="button">Launch App</button>
            </Link>
        </div>
        <div class="menu-button w-nav-button">
          <div class="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  </div>

  <div class="section-header">
    <div class="container-regular">
        <div >
        <div class="header-content">
          <div class="header-badge"> 
            <div class="header-badge-light">
              <div>New</div>
            </div>
            <div>Launching beta service on TON Chain!</div>
          </div>
        </div>
        <div style={{fontSize:"40px"}}>Unlock the Full Potential of DeFi: <br/> 
        <span style={{fontSize:"30px"}}>Earn More, Hassle Less with Us!</span></div>
        <div style={{marginTop:"50px"}} />

        <Link to={`/wallet`}>
            <button class="button-primary" type="button" style={{cursor:"pointer"}}>Launch App</button>
        </Link>

        <div style={{marginTop:"50px"}}> 
        </div>

        <div style={{fontSize:"25px"}}>
        <hr style={{width:"150px"}}/>
            <div style={{marginTop:"50px"}} />
            👋 welcome !
            <div style={{marginTop:"50px"}} />
        </div>
        <div> 🔍 Track your TON chain portfolio in one-place</div> 

        <div>
            <div style={{marginTop:"30px"}} /> 
            <img src={lending} loading="lazy" alt="" class="image-cover" />    
            <div style={{marginTop:"30px"}}/> 
        </div>

        <div>
            <div> 👍 Find the best investment </div> 
            <div style={{marginTop:"30px"}}/> 
            <img src={lending} loading="lazy" alt="" class="image-cover" />    
            <div style={{marginTop:"30px"}}/> 
        </div>


        <div style={{marginTop:"30px"}}/> 
        <div style={{fontSize:"20px"}}>Turn on the notification to manage your assets!</div> 
        </div>

      </div>
    </div>

    </>
  );
}

export default Lending;



