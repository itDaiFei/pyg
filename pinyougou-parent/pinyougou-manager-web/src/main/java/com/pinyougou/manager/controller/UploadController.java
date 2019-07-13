package com.pinyougou.manager.controller;


import entity.Result;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import utils.FastDFSClient;


/**
 * 文件上传 Controller
 * @author Administrator
 *
 */
@RestController
public class UploadController {

    @Value("${FILE_SERVER_URL}")
    private String file_service_url;

    @RequestMapping("/upload")
    public Result upload(MultipartFile file){
        //1、取文件的扩展名
        String originalFilename = file.getOriginalFilename();
        String fileType = originalFilename.substring(originalFilename.lastIndexOf(".")+1);

        //2、创建一个 FastDFS 的客户端
        try {
            FastDFSClient fastDFSClient = new FastDFSClient("classpath:config/fdfs_client.conf");
            //3、执行上传处理
            String uploadFile = fastDFSClient.uploadFile(file.getBytes(), fileType);
            //4、拼接返回的 url 和 ip 地址，拼装成完整的 url
            String url = file_service_url+uploadFile;
            return new Result(true,url);
        } catch (Exception e) {
            e.printStackTrace();
            return new Result(false,"上传错误");
        }
    }

}
