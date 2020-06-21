using System.Collections.Generic;

namespace UltimateSlotMachine.ViewModels
{
    public class ViewGameModel
    {
        public decimal Deposit { get; set; }

        public decimal WinniningAmount { get; set; }

        public IEnumerable<string> PayLines { get; set; }
    }
}
