import Toast from "react-native-toast-message";
import {Icon, Label, NativeTabs} from "expo-router/unstable-native-tabs";

export default function Layout() {
    return (
        <>
            <NativeTabs>
                <NativeTabs.Trigger name="index">
                    <Label>首页</Label>
                    <Icon sf="house.fill" drawable="custom_android_drawable"/>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="fav">
                    <Icon sf="star" drawable="custom_settings_drawable"/>
                    <Label>收藏</Label>
                </NativeTabs.Trigger>
                <NativeTabs.Trigger name="profile">
                    <Icon sf="person.fill" drawable="custom_settings_drawable"/>
                    <Label>个人</Label>
                </NativeTabs.Trigger>
            </NativeTabs>
            <Toast
                position='bottom'
                bottomOffset={20}
            />
        </>
    );
}