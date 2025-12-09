package org.noenglish.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        // 你电脑上 avatar 文件夹的绝对路径
        String avatarPath = "/Users/xuyusong/IdeaProjects/avatars/";

        registry.addResourceHandler("/avatar/**")
                .addResourceLocations("file:" + avatarPath);
    }
}
