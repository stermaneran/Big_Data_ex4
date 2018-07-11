# Big_Data_ex4

Our dataset represents the number of sales (in thousands of units) for our product advertising budgets (in thousands of dollars).


scp -r -P22 dbar@10.9.4.103:/home/dbar/Documents/School/bigdata/Big_Data_ex4 .
#curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
#sudo yum -y install nodejs

#git clone https://github.com/stermaneran/Big_Data_ex4
cd /home/Big_Data_ex4
node app








***********

Get IP:
hostname -I | awk '{print $1;}'

Get Docker container ID:
sudo docker container ls |grep bigdataex4 | awk '{print $1;}'


Run node server:
sudo docker exec d58d01b16c25 /bin/bash -c "cd /home/Big_Data_ex4 ; node app"


**********

(sudo docker exec <DOCKER_CONT_ID> /bin/bash -c '<CMD>')
