import com.amazonaws.services.lambda.runtime.Context; 
import com.amazonaws.services.lambda.runtime.LambdaLogger;

public class Hello {
    public String myHandler(String fileId, Context context) {
        LambdaLogger logger = context.getLogger();
        logger.log("received : " + fileId);
        return String.valueOf(fileId);
    }
}
