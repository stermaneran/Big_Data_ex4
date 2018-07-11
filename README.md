# Big_Data_ex4

Our dataset represents the number of sales (in thousands of units) for our product advertising budgets (in thousands of dollars).


scp -r -P22 dbar@10.9.4.103:/home/dbar/Documents/School/bigdata/Big_Data_ex4 .
#curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
#sudo yum -y install nodejs

#git clone https://github.com/stermaneran/Big_Data_ex4
cd /home/Big_Data_ex4
node app








***********
Run docker container:
sudo docker run -it -p 3000:3000  bigdataex4:latest

Get IP:
hostname -I | awk '{print $1;}'

SCP:
cd /home && rm -r home/Big_Data_ex4 && scp -r -P22 dbar@IPADDR:/home/dbar/Documents/School/bigdata/Big_Data_ex4 /home/
scp -r -P22 dbar@IPADDR:/home/dbar/Documents/School/bigdata/Big_Data_ex4 /home/

Get Docker container ID:
sudo docker container ls |grep bigdataex4 | awk '{print $1;}'

Run node server:
sudo docker exec CONT_ID /bin/bash -c "cd /home/Big_Data_ex4 ; node app"


**********

(sudo docker exec <DOCKER_CONT_ID> /bin/bash -c '<CMD>')
