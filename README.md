# Big_Data_ex4

Our dataset represents the number of sales (in thousands of units) for our product advertising budgets (in thousands of dollars).


scp -r -P22 dbar@10.9.4.103:/home/dbar/Documents/School/bigdata/Big_Data_ex4 .
#curl --silent --location https://rpm.nodesource.com/setup_10.x | sudo bash -
#sudo yum -y install nodejs

#git clone https://github.com/stermaneran/Big_Data_ex4
cd /home/Big_Data_ex4
node app








***********
sudo docker exec 8dfcfe715a49 /bin/bash -c 'cd /home/Big_Data_ex4 && node app'




ip a |grep wlp1s0 |grep inet| awk '{print $2;}'| sed -e 's/\/20//g'

sudo docker exec 8dfcfe715a49 /bin/bash -c "cd /home && rm -r Big_Data_ex4 && scp -P22 dbar@$IPADDR:/home/dbar/Documents/School/bigdata/Big_Data_ex4 . && cd Big_Data_ex4 && node app"
**********

(sudo docker exec <DOCKER_CONT_ID> /bin/bash -c '<CMD>')
