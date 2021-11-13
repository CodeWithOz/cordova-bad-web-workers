# Hardware Acceleration Plugin
This plugin provides a way to toggle the type of layer that an Android app uses. The idea is to provide a mimic the effect of disabling and reenabling hardware acceleration while the app is in use. The plugin uses the [`setLayerType`](https://developer.android.com/reference/android/view/View#setLayerType(int,%20android.graphics.Paint)) method of the `View` class.

**Note**: this is only applicable to Android
