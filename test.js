var expect = require('chai').expect;

var HumanTime = require('./human-time.js');
var humanTime = new HumanTime;


describe('Human time', function() {
  
  it('is a class', function() {
    expect(humanTime instanceof HumanTime).to.equal(true);
  });
  
  it('has a print function', function() {
    expect(typeof humanTime.print).to.equal('function');
  });
  
  it('prints 1 second if time is 1000', function() {
    expect(humanTime.print(1000)).to.equal('1 second');
  });
  
  it('prints 2 seconds if time is 2000', function() {
    expect(humanTime.print(2000)).to.equal('2 seconds');
  });
  
  it('prints 0 if time is 0', function() {
    expect(humanTime.print(0)).to.equal('0');
  });
  
  it('prints 500 milliseconds if time is 500', function() {
    expect(humanTime.print(500)).to.equal('500 milliseconds');
  });
  
  it('prints 2 minutes if time is 120*1000', function() {
    expect(humanTime.print(120*1000)).to.equal('2 minutes');
  });
  
  it('prints 5 seconds if time is 4500 or 5499', function() {
    expect(humanTime.print(4500)).to.equal('5 seconds');
    expect(humanTime.print(5499)).to.equal('5 seconds');
  });
  
  it('prints 1 year if time is a big number (equivalent to 400 days)', function() {
    var time = 400 * 24 * 60 * 60 * 1000; // 400 days
    expect(humanTime.print(time)).to.equal('1 year');
  });
  
  describe('using options', function() {
  
    it('prints 1.23 seconds if time is 1234 and digits is 2', function() {
      var humanTime = new HumanTime({digits: 2});
      expect(humanTime.print(1234)).to.equal('1.23 seconds');
    });
    
    it('prints 1 second if time is 1000 and digits is 2', function() {
      var humanTime = new HumanTime({digits: 2});
      expect(humanTime.print(1000)).to.equal('1 second');
    });
  
    it('prints 54.3 seconds if time is 54321 and precision is 3', function() {
      var precisionRound = function(num, n) {
        return +num.toPrecision(n);
      };
      var humanTime = new HumanTime({digits: 3, round: precisionRound});
      expect(humanTime.print(54321)).to.equal('54.3 seconds');
    });
  
    it('prints 1 second if time is 1999 and truncate is used', function() {
      var truncateRound = function(num) {
        return num >> 0;
      };
      var humanTime = new HumanTime({round: truncateRound});
      expect(humanTime.print(1999)).to.equal('1 second');
    });
  
    it('prints 1.2 seconds if time is 1234 and digits was set to 1 after constructor', function() {
      var humanTime = new HumanTime;
      humanTime.digits = 1;
      expect(humanTime.print(1234)).to.equal('1.2 seconds');
    });
    
    describe('ms for milliseconds name', function() {
      var humanTime;
      
      before(function() {
        humanTime = new HumanTime({
          names: {'millisecond': 'ms'}
        });
      });
      
      it('prints 1ms if time is 1', function() {
        expect(humanTime.print(1)).to.equal('1ms');
      });
      
      it('prints 1ms if time is 2', function() {
        expect(humanTime.print(2)).to.equal('2ms');
      });
      
    });
    
    describe('segundos for seconds name', function() {
      var humanTime;
      
      before(function() {
        humanTime = new HumanTime({
          names: {'second': ' segundo`'}
        });
      });
      
      it('prints 1 segundo if time is 1000', function() {
        expect(humanTime.print(1000)).to.equal('1 segundo');
      });
      
      it('prints 2 segundos if time is 2000', function() {
        expect(humanTime.print(2000)).to.equal('2 segundos');
      });
      
    });
    
    describe('seconds ago for seconds name', function() {
      var humanTime;
      
      before(function() {
        humanTime = new HumanTime({
          names: {'second': ' second` ago'}
        });
      });
      
      it('prints 1 second ago if time is 1000', function() {
        expect(humanTime.print(1000)).to.equal('1 second ago');
      });
      
      it('prints 2 seconds ago if time is 2000', function() {
        expect(humanTime.print(2000)).to.equal('2 seconds ago');
      });
      
    });
    
    describe('meses for months name', function() {
      var humanTime;
      
      before(function() {
        humanTime = new HumanTime({
          names: {'month': ' mes`'}, plurals: {'month': 'es'}
        });
      });
      
      it('prints 1 mes if time is 1 month', function() {
        expect(humanTime.print(30 * 24 * 60 * 60 * 1000)).to.equal('1 mes');
      });
      
      it('prints 2 meses if time is 2 months', function() {
        expect(humanTime.print(2 * 30 * 24 * 60 * 60 * 1000)).to.equal('2 meses');
      });
      
    });
    
  });
  
});
