package FutureKorea.FutureKorea;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

@SpringBootApplication
@PropertySource("classpath:/key.properties")
public class FutureKoreaApplication {

	public static void main(String[] args) {
		SpringApplication.run(FutureKoreaApplication.class, args);
	}

}
