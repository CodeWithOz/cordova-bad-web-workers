package plugin.hardwareacceleration.hardwareacceleration;

import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.view.View;

public class HardwareAcceleration extends CordovaPlugin {
    @Override
    public void initialize(CordovaInterface cordova, CordovaWebView webView) {
        super.initialize(cordova, webView);
    }

    @Override
    public boolean execute(String action, JSONArray args, CallbackContext callbackContext) throws JSONException {
        if (action.equals("disable")) {
            View view = webView.getView();
            view.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
            return true;
        } else if (action.equals("enable")) {
            View view = webView.getView();
            view.setLayerType(View.LAYER_TYPE_HARDWARE, null);
            return true;
        } else if (action.equals("getLayerType")) {
            View view = webView.getView();
            int layerType = view.getLayerType();
            String typeName = "N/A";
            if (layerType == View.LAYER_TYPE_NONE, null) {
                typeName = "NONE";
            } else if (layerType == View.LAYER_TYPE_SOFTWARE, null) {
                typeName = "SOFTWARE";
            } else if (layerType == View.LAYER_TYPE_HARDWARE, null) {
                typeName = "HARDWARE";
            }
            callbackContext.success(typeName);
            return true;
        } else {
            return false;
        }
    }
}
