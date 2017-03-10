import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler, DeepLinkConfig} from "ionic-angular";
import {MyApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contacts/contact";
//import {Menu} from "../pages/menu/menu";
import {Dashboard} from "../pages/dashboard/dashboard";
import {VerificationPage} from "../pages/auth/verification/verification";
import {SignUpPage} from "../pages/auth/signup/signup";
import {Devices} from "../pages/devices/devices";
import {Emergency} from "../pages/emergency/emergency";
import {Carriers} from "../pages/naloxone-carriers/carriers";
import {Settings} from "../pages/settings/settings";
import {ContactAddPage} from "../pages/contact-add/contact-add";
import {DevicesEdit} from "../pages/devices-edit/devices-edit";
import {OpioidTool} from "../pages/opioid-tool/opioid";
import {SettingsEdit} from "../pages/setting-edit/setting-edit";
import {OpioidUsers} from "../pages/opioid-users/opioidusers";
import {
    ApiService,
    UserService,
    JwtService,
    DeviceService
} from "../shared";

//import { Auth } from '../pages/auth/auth.module';


export const deepLinkConfig: DeepLinkConfig = <DeepLinkConfig>{
    links: [
        {component: ContactPage, name: "contact", segment: "contact"},
        {component: AboutPage, name: "about", segment: "about"},
        {component: VerificationPage, name: "verification", segment: "verification"},
        {component: SignUpPage, name: "signup", segment: "signup"},
        {component: Devices, name: "devices", segment: "devices"},
        {component: Emergency, name: "emergency", segment: "emergency"},
        {component: Carriers, name: "carriers", segment: "carriers"},
        {component: Settings, name: "settings", segment: "settings"},
        {component: ContactAddPage, name: "contactadd", segment: "contactadd"},
        {component: DevicesEdit, name: "devicesedit", segment: "devicesedit"},
        {component: OpioidTool, name: "opioidtool", segment: "opioidtool"},
        {component: SettingsEdit, name: "settingsedit", segment: "settingsedit"},
        {component: OpioidUsers, name: "opioidusers", segment: "opioidusers"},
        {component: Dashboard, name: "dashboard", segment: "dashboard"}
        ]
};

@NgModule({
    declarations: [
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
        DevicesEdit,
        ContactAddPage,
        OpioidUsers,
        Dashboard
        ],
    imports: [
        //Auth,
        IonicModule.forRoot(MyApp,{},deepLinkConfig)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
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
        DevicesEdit,
        ContactAddPage,
        OpioidUsers
    ],
    providers: [ {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {

}
