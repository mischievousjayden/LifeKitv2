import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig} from "ionic-angular";
import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contacts/contact";
import {Dashboard} from "../pages/dashboard/dashboard";
import {VerificationPage} from "../pages/auth/verification/verification";
import {SignUpPage} from "../pages/auth/signup/signup";
import {Devices} from "../pages/devices/devices";
import {Emergency} from "../pages/emergency/emergency";
import {Carriers} from "../pages/naloxone-carriers/carriers";
import {Settings} from "../pages/settings/settings";
import {ContactAddPage} from "../pages/contact-add/contact-add";
import {OpioidTool} from "../pages/opioid-tool/opioid";
import {SettingsEdit} from "../pages/setting-edit/setting-edit";
import {OpioidUsers} from "../pages/opioid-users/opioidusers";
import {Home} from "../pages/home/home";
import {Start } from "../pages/start/start";
import {CarrierSettingsModel} from "../shared/models/carrier-settings/carrier-settings.model";
import {NaloxoneLocator} from "../pages/naloxone-locator/naloxone-locator"

import {
    ApiService,
    UserService,
    JwtService,
    DeviceService
} from "../shared";
import {BluetoothService} from "../shared/services/bluetooth.service";
import {TypeUser} from "../pages/type-user/typeuser";

//import { Auth } from '../pages/auth/auth.module';


export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
    links: [
      {component: TypeUser, name: "usertype", segment: "usertype"},
      {component: NaloxoneLocator, name: "naloxonelocator", segment: "naloxonelocator"},
      {component: Home, name: "home", segment: "home"},
        {component: VerificationPage, name: "verificationpage", segment: "verificationpage"},
        {component: SignUpPage, name: "signuppage", segment: "signuppage"},
        {component: Start, name: "start", segment: "start"},
        {component: ContactPage, name: "contact", segment: "contact"},
        {component: AboutPage, name: "about", segment: "about"},
        {component: VerificationPage, name: "verification", segment: "verification"},
        {component: SignUpPage, name: "signup", segment: "signup"},
        {component: Devices, name: "devices", segment: "devices"},
        {component: Emergency, name: "emergency", segment: "emergency"},
        {component: Carriers, name: "carriers", segment: "carriers"},
        {component: Settings, name: "settings", segment: "settings"},
        {component: ContactAddPage, name: "contactadd", segment: "contactadd"},
        {component: OpioidTool, name: "opioidtool", segment: "opioidtool"},
        {component: SettingsEdit, name: "settingsedit", segment: "settingsedit"},
        {component: OpioidUsers, name: "opioidusers", segment: "opioidusers"},
        {component: Dashboard, name: "dashboard", segment: "dashboard"},

    ]
};
//need to add naloxonelocator
export const menuLinks = [
  {label:'Emergency Contact', name:'contact'},
  {label:'Naloxone Locator', name:'naloxonelocator'},
  {label:'Manage Device', name:'devices'},
  {label:'User Settings', name:'settingsedit'},
  {label:'Opiod Quiz', name:'opioidtool'},
  {label:'Help and Information', name:'about'},
  {label:'TESTING-DASHBOARD',name:'dashboard'}
];

@NgModule({
    declarations: [
        TypeUser,
        NaloxoneLocator,
        Start,
        MyApp,
        AboutPage,
        ContactPage,
        VerificationPage,
        SignUpPage,
        Devices,
        Emergency,
        Carriers,
        Settings,
        SettingsEdit,
        OpioidTool,
        ContactAddPage,
        OpioidUsers,
        Dashboard,
        Home,
        CarrierSettingsModel
        ],
    imports: [
        //Auth,
        IonicModule.forRoot(MyApp,{},deepLinkConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        TypeUser,
        NaloxoneLocator,
        Start,
        MyApp,
        AboutPage,
        ContactPage,
        Dashboard,
        VerificationPage,
        SignUpPage,
        Devices,
        Emergency,
        Carriers,
        Settings,
        SettingsEdit,
        OpioidTool,
        ContactAddPage,
        OpioidUsers,
        Home
    ],
    providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {

}
