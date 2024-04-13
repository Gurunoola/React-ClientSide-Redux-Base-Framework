import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 
html, body {  height: 100%;  width: 100%;  background-color: #f8f9fc;}
body {  font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji" !important;}
body.fontLoaded {  font-family: Nunito,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji" !important;}

/*====================== redefine scroll style =======================*/

::-webkit-scrollbar {  width: 4px; height: 4px;  opacity: 0.5 } /* width */
::-webkit-scrollbar-track {} /* Track */
::-webkit-scrollbar-thumb {  background: var(--secondary);  opacity: 0.5;} /* Handle */
::-webkit-scrollbar-thumb:hover {  background: #555;  opacity: 0.5 } /* Handle on hover */

.sideBarSubMenuCustom {  transform: none !important;  box-shadow: 0 .125rem .25rem rgba(0,0,0,.075)!important;  transition: margin 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94);  min-width: auto !important;}
.sidebar li:hover > a{  opacity: 0.5; }
.clientLogo{  max-width: 100% !important;  padding: 0 7px !important;}
.clientIcon{  max-width: 50px !important;}
.clientLogoContainer{   
  background-color: #fff;    z-index: 1200;
  }
.headcol {  position: absolute;  width: 5em;  left: 0;  top: auto;  border-top-width: 1px; /*only relevant for first row*/  margin-top: -1px; /*compensate for top border*/}
.headcol:before {  content: 'Row ';}

@media (min-width: 576px) {
    .text-sm-center {      text-align: center !important; }
}
/*====================== 404 page =======================*/
.page_404{  padding:40px 0;  background:#fff;}
.page_404 img{  width:100%;}
.four_zero_four_bg{  height: 400px;  background-position: center;}
.four_zero_four_bg h1{  font-size:80px;}
.four_zero_four_bg h3{  font-size:80px;}
.link_404{  color: #fff!important;  padding: 10px 20px;  background: #39ac31;  margin: 20px 0;  display: inline-block;}
.contant_box_404{  margin-top:20px;}
.ViewPage label{}
.photoDiv{  background: #e3e6f0;  min-height: 200px;}
.photoDiv img {  width: 100%;}
.profile-card{ padding: 20% 0}
`;

export default GlobalStyle;
