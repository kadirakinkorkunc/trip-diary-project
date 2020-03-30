package com.tripdiaryproject.kafkaconsumer.services;


import com.tripdiaryproject.kafkaconsumer.domain.TransferObject;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
public class KafkaListenerService {
        private String userDirectory = new File("").getAbsolutePath();
        private Logger logger = LogManager.getLogger();


    @KafkaListener(
                topics = "${kafkaconsumer.topic}",
                groupId = "${kafkaconsumer.group.id}",
                containerFactory = "concurrentKafkaListenerContainerFactory",
                autoStartup = "true"
        )
        public void listen(@Payload String message){
//            int month = transferObject.getMessageDate().getMonthValue();
//            int day = transferObject.getMessageDate().getDayOfWeek().getValue();
//            int year = transferObject.getMessageDate().getYear();
//
//            File targetFile = new File(userDirectory, "..\\logs\\" + year + "\\" + month + "\\" + day + "\\logs.txt" );
//            String message = transferObject.getMessageDate() + "-->" + transferObject.getMessage() + "(LOG ID:" + transferObject.getId();
//
//
//
//
//            if( checkLogDirExists(year,month,day) ){
//               if (checkLogFileExists(year,month,day)){
//                   writeANewLine(message, targetFile);
//               }else{
//                   createAndWrite(message, targetFile);
//               }
//
//            }else{
//                ifLogDirDoesNotExistsCreateNeccesaryDirectories(year,month,day);
//                writeANewLine(message,targetFile);
//            }
        logger.info(message);

    }


        /*
        This function writes a new line to existing log.txt file
         */
        private void writeANewLine(String message, File targetFile) {
            try(FileWriter fw = new FileWriter(targetFile, true);
                BufferedWriter bw = new BufferedWriter(fw);
                PrintWriter out = new PrintWriter(bw))
            {
                out.println(message);
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("ERROR IN WRITE A NEW LINE");
            }

        }

        /*
        This function creates a logs.txt file and writes into it
         */
        private void createAndWrite(String message, File targetFile) {
            try {
                targetFile.createNewFile();
                //write func ekle
            } catch (IOException e) {
                e.printStackTrace();
                System.out.println("error in createandwritefunc");
            }

        }


        /*
        This function checks if there is a log.txt
         */
        private boolean checkLogFileExists(int year, int month, int day) {
            File tempFile = new File(userDirectory, "..\\logs\\" + year + "\\" + month + "\\" + day + "\\logs.txt" );
            return tempFile.exists();
        }


        /*
            This function creates a directory like logs/year/month/day/
         */
        public void ifLogDirDoesNotExistsCreateNeccesaryDirectories(int year,int month,int day){
                File dir = new File(userDirectory,"..\\logs\\" + year + "\\" + month + "\\" + day);
                dir.mkdirs();
            }


        /*
            This function checks if there is a directory called "logs"
         */
        public boolean checkLogDirExists(int year, int month, int day){
            File dir = new File(userDirectory,"..\\logs\\" + year + "\\" + month + "\\" + day);
            return dir.exists();
        }



}
