#include <mariadb/conncpp.hpp>
#include <string>
using namespace std;

#ifndef CONTACTENTRY_H
#define CONTACTENTRY_H

class contactEntry {
public:
     contactEntry();
     contactEntry(sql::SQLString f, sql::SQLString l, sql::SQLString p, sql::SQLString e, sql::SQLString s, sql::SQLString m, sql::SQLString y, sql::SQLString t, sql::SQLString I);
     string text();
     string json();
     
     string first;
     string last;
     string phone;
     string type;
     string email;
     string SSN;
     string meal;
     string yakarma;
     string ID;

private:

};

#endif /* CONTACTENTRY_H */

